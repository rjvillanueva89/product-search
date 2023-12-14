import { db } from "@/database/db"
import { products } from "@/database/schema/products"

export const createProduct = async () => {
  await db
    .insert(products)
    .values({ product_id: "p15", name: "product 15", cost: "150" })
}
