import { ListName } from "./ListType"

export interface ResponseInventoriesInfo {
  name: string
  title: string
  imagePath: string
  lists: ListName []
}
