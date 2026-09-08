/**
 * Anti-corruption layer between the ERP storefront API and the shapes the
 * frontend already expects (originally modeled after the legacy backend).
 *
 * The ERP deliberately uses cleaner names (categories instead of
 * inventories/lists, imageUrl instead of imagePath, a compact pagination
 * envelope, price as a number). These mappers translate ERP responses back to
 * the existing frontend types so no component or hook has to change.
 */
import type { GetCarouselImages } from "../types/GetCarouselImages";
import type { ResponseInventoriesInfo, ResponseInventoryViewById } from "../types/inventory";
import type { PaginatedProducts } from "../types/ListType";
import type {
  Color,
  FeaturedProductCard,
  PaginatedResponse,
  Product,
  ProductCard,
  SearchedProduct,
} from "../types/ProductTypes";

// ---- ERP response shapes (storefront/v1) -----------------------------------

export interface ErpCategoryRef {
  id: string;
  name: string;
}

export interface ErpCategoryNode {
  id: string;
  name: string;
  title: string;
  imageUrl: string | null;
  children: ErpCategoryRef[];
}

export interface ErpCategoryDetail extends ErpCategoryNode {
  parentId: string | null;
}

export interface ErpColor {
  name: string | null;
  hexCode: string;
}

export interface ErpProductCard {
  id: string;
  name: string;
  imageUrl: string | null;
  price: number;
  colors: ErpColor[];
}

export interface ErpProductDetail {
  id: string;
  name: string;
  imageUrl: string | null;
  images: string[];
  description: string | null;
  price: number;
  colors: ErpColor[];
  material: string | null;
  size: string | null;
  printingArea: string | null;
  printingMethods: { id: string; name: string }[];
  boxContent: string | null;
  isPrintPersonalizable: boolean;
  categoryId: string | null;
  categoryName: string | null;
}

export interface ErpPage<T> {
  items: T[];
  page: number;
  size: number;
  total: number;
  totalPages: number;
}

export interface ErpCategoryProducts {
  category: ErpCategoryRef;
  products: ErpPage<ErpProductCard>;
}

/** `GET /banners` item: enabled hero banners, already ordered by sortOrder. */
export interface ErpBanner {
  id: string;
  /** Absolute URL on the ERP host; 302s to a presigned object. */
  imageUrl: string;
  alt: string;
  sortOrder: number;
}

// ---- mappers ----------------------------------------------------------------

const SORT = { empty: true, sorted: false, unsorted: true };

function mapColors(colors: ErpColor[] | undefined): Color[] {
  return (colors ?? []).map((c) => ({ name: c.name ?? "", hexCode: c.hexCode }));
}

function mapProductCard(p: ErpProductCard): ProductCard {
  return {
    id: p.id,
    name: p.name,
    imageUrl: p.imageUrl ?? "",
    colors: mapColors(p.colors),
    price: p.price != null ? String(p.price) : "",
  };
}

/**
 * Rebuild the legacy Spring `Page` envelope the ProductList component reads
 * (content, pageable.pageNumber/pageSize, first/last, totalElements, ...).
 */
export function toSpringPage(page: ErpPage<ErpProductCard>): PaginatedProducts {
  const content = page.items.map(mapProductCard);
  const isFirst = page.page <= 0;
  const isLast = page.totalPages === 0 ? true : page.page >= page.totalPages - 1;
  return {
    content,
    pageable: {
      pageNumber: page.page,
      pageSize: page.size,
      sort: SORT,
      offset: page.page * page.size,
      paged: true,
      unpaged: false,
    },
    last: isLast,
    totalElements: page.total,
    totalPages: page.totalPages,
    first: isFirst,
    size: page.size,
    number: page.page,
    sort: SORT,
    numberOfElements: content.length,
    empty: content.length === 0,
  };
}

/** Generic-typed variant for the productService.filter return. */
export function toPaginatedResponse(page: ErpPage<ErpProductCard>): PaginatedResponse<ProductCard> {
  return toSpringPage(page) as unknown as PaginatedResponse<ProductCard>;
}

export function mapCategoryNodeToInventoryInfo(node: ErpCategoryNode): ResponseInventoriesInfo {
  return {
    id: node.id,
    name: node.name,
    title: node.title,
    imagePath: node.imageUrl ?? "",
    lists: node.children.map((c) => ({ id: c.id, name: c.name })),
  };
}

export function mapCategoryDetailToInventoryView(
  detail: ErpCategoryDetail,
): ResponseInventoryViewById {
  return {
    title: detail.title,
    lists: detail.children.map((c) => ({ id: c.id, name: c.name })),
  };
}

export function mapFeatured(items: ErpProductCard[]): FeaturedProductCard[] {
  return items.map((p) => ({ id: p.id, name: p.name, imageUrl: p.imageUrl ?? "" }));
}

export function mapSearched(items: ErpProductCard[]): SearchedProduct[] {
  return items.map((p) => ({ id: p.id, name: p.name, imageUrl: p.imageUrl ?? "" }));
}

export function mapProductDetail(p: ErpProductDetail): Product {
  return {
    id: p.id,
    name: p.name,
    imageUrl: p.imageUrl ?? "",
    colors: mapColors(p.colors),
    price: p.price != null ? String(p.price) : "",
    description: p.description ?? "",
    size: p.size ?? "",
    material: p.material ?? "",
    printingArea: p.printingArea ?? "",
    printingMethods: p.printingMethods ?? [],
    boxContent: p.boxContent ?? "",
    isPrintPersonalizable: p.isPrintPersonalizable,
  };
}

/**
 * `GET /banners` -> the shape the Hero already reads. The ERP returns enabled
 * banners only, ordered, at most three, so the mapper preserves the order it is
 * given and does not filter or sort. `carouselAlts` is parallel to
 * `carouselImages`; an empty list yields empty lists and the Hero falls back to
 * its placeholder.
 */
export function mapBannersToCarousel(items: ErpBanner[] | undefined): GetCarouselImages {
  const banners = items ?? [];
  return {
    carouselImages: banners.map((b) => b.imageUrl),
    carouselAlts: banners.map((b) => b.alt),
  };
}
