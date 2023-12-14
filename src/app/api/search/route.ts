import { searchProduct } from "@/actions/searchProduct"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()

  const result = await searchProduct(body.search)

  if (!result) return NextResponse.json({})

  return NextResponse.json(result)
}
