/**
 * Contract test for the ERP storefront `GET /banners` -> Hero carousel mapping.
 *
 * The fixture below is the response the ERP OpenAPI document describes for
 * `GET /api/storefront/v1/banners` (`#/components/schemas/Banner`: id, imageUrl,
 * alt, sortOrder — all required). The ERP returns enabled banners only, already
 * ordered by sortOrder, at most three.
 *
 * Run with: npm run test:contract
 * (`--experimental-strip-types` lets Node import the TypeScript mapper directly;
 * the repo has no unit-test runner, so this keeps the dependency count at zero.)
 */
import assert from 'node:assert/strict';
import test from 'node:test';

import { mapBannersToCarousel } from '../../src/api/erpMappers.ts';

/** Verbatim shape of a 200 from GET /api/storefront/v1/banners. */
const BANNERS_RESPONSE = {
    items: [
        {
            id: '0f1a6a8e-1d3e-4b2a-9c4d-2f5b7a9e1c33',
            imageUrl: 'https://yancapublicidad.fabricabinaria.com/api/storefront/v1/files/0f1a6a8e-1d3e-4b2a-9c4d-2f5b7a9e1c33?size=medium',
            alt: 'Corte y grabado láser sobre madera',
            sortOrder: 1,
        },
        {
            id: '2b8c4d6e-5a7f-4e91-8b02-6d3c1e9f4a55',
            imageUrl: 'https://yancapublicidad.fabricabinaria.com/api/storefront/v1/files/2b8c4d6e-5a7f-4e91-8b02-6d3c1e9f4a55?size=medium',
            alt: 'Impresión full color sobre rígidos',
            sortOrder: 2,
        },
        {
            id: '7c9e2f10-3b4d-4a8c-95e6-1f7a0d2b8c44',
            imageUrl: 'https://yancapublicidad.fabricabinaria.com/api/storefront/v1/files/7c9e2f10-3b4d-4a8c-95e6-1f7a0d2b8c44?size=medium',
            alt: 'Gafetes identificadores',
            sortOrder: 3,
        },
    ],
};

test('maps the ERP banner list to the shape the Hero reads', () => {
    const result = mapBannersToCarousel(BANNERS_RESPONSE.items);

    assert.deepEqual(result, {
        carouselImages: BANNERS_RESPONSE.items.map((b) => b.imageUrl),
        carouselAlts: BANNERS_RESPONSE.items.map((b) => b.alt),
    });
});

test('preserves the order the ERP sent (it already sorts by sortOrder)', () => {
    const { carouselImages, carouselAlts } = mapBannersToCarousel(BANNERS_RESPONSE.items);

    assert.deepEqual(carouselAlts, [
        'Corte y grabado láser sobre madera',
        'Impresión full color sobre rígidos',
        'Gafetes identificadores',
    ]);
    assert.equal(carouselImages.length, 3);
    assert.ok(carouselImages[0].includes('0f1a6a8e'));
    assert.ok(carouselImages[2].includes('7c9e2f10'));
});

test('alt stays parallel to the image it belongs to', () => {
    const { carouselImages, carouselAlts } = mapBannersToCarousel(BANNERS_RESPONSE.items);

    for (const [i, banner] of BANNERS_RESPONSE.items.entries()) {
        assert.equal(carouselImages[i], banner.imageUrl);
        assert.equal(carouselAlts[i], banner.alt);
    }
});

test('no banners -> empty lists, so the Hero falls back to its placeholder', () => {
    assert.deepEqual(mapBannersToCarousel([]), { carouselImages: [], carouselAlts: [] });
});

test('a missing items array is tolerated as empty', () => {
    assert.deepEqual(mapBannersToCarousel(undefined), { carouselImages: [], carouselAlts: [] });
});
