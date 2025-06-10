import { ListName } from "./ListType"

export interface ResponseInventoriesInfo {
  id: string
  name: string
  title: string
  imagePath: string
  lists: ListName []
}

export interface ResponseInventoryViewById {
  title: string
  lists: ListName []
}