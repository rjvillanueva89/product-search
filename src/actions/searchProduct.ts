import { db } from "@/database/db"
import { products } from "@/database/schema/products"
import { eq } from "drizzle-orm"

export const searchProduct = async (productId: string) => {
  const data = await db
    .select()
    .from(products)
    .where(eq(products.product_id, productId))

  return data[0]
}
