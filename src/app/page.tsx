"use client"

import { useCart } from "@/store/useCart"
import { useState } from "react"

type Product = {
  id: string
  product_id: string
  name: string
  cost: number
}

export default function Home() {
  const cart = useCart()
  const [search, setSearch] = useState("")
  const [product, setProduct] = useState<Product | null>()
  const [quantity, setQuantity] = useState<string>("")
  const [cash, setCash] = useState("")

  const handleSearch = async () => {
    const response = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({ search }),
    })
    const responseJson = await response.json()

    if (!responseJson.id) {
      alert("Product doesn't exist")
      setSearch("")
    } else {
      setProduct(responseJson)
    }
  }

  const handleAddCart = () => {
    const total = product && product.cost * parseInt(quantity)
    cart.add({
      ...product,
      quantity: parseInt(quantity),
      total: total ? total : 0,
    })

    setSearch("")
    setProduct(null)
    setQuantity("")
  }

  const total = cart.products.reduce((accumulator, product) => {
    return accumulator + product.total!
  }, 0)

  const handleReset = () => {
    cart.empty()
    setSearch("")
    setProduct(null)
    setQuantity("")
    setCash("")
  }

  const handleSaveTransaction = () => {
    alert("Transaction Saved!")

    cart.empty()
    setSearch("")
    setProduct(null)
    setQuantity("")
    setCash("")
  }

  return (
    <>
      <div className="flex items-center gap-4 p-4">
        <input
          className="p-4 border grow"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search product id"
        />
        <button onClick={handleSearch}>search</button>
        <button onClick={handleReset}>reset</button>
      </div>
      <div className="border p-4">
        <div className="flex items-center gap-4">
          <b>Product ID:</b> {product?.product_id}
        </div>
        <div className="flex items-center gap-4">
          <b>Product Name:</b> {product?.name}
        </div>
        <div className="flex items-center gap-4">
          <b>Product Cost:</b> {product?.cost}
        </div>
        <div className="flex items-center gap-4">
          Quantity:{" "}
          <input
            type="number"
            className="border"
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
          />
        </div>
        <div className="flex justify-end w-full p-4">
          <button
            onClick={handleAddCart}
            className="bg-slate-700 px-4 py-2 font-light text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="p-4 border">
        <h2 className="text-2xl mb-4">Order List</h2>
        <table className="table w-full text-center">
          <thead>
            <tr className="bg-slate-700 text-white">
              <th className="p-4 font-light">Product Name</th>
              <th className="p-4 font-light">Quantity</th>
              <th className="p-4 font-light">Cost</th>
              <th className="p-4 font-light">Total</th>
              <th className="p-4 font-light">Option</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((product) => {
              return (
                <tr key={product.id}>
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">{product.quantity}</td>
                  <td className="p-4">{product.cost}</td>
                  <td className="p-4">{product.total}</td>
                  <td className="p-4">
                    <button onClick={() => cart.delete(product.id!)}>
                      remove
                    </button>
                  </td>
                </tr>
              )
            })}
            {!cart.products.length && (
              <tr>
                <td colSpan={5} className="p-4">
                  Add Product
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="border p-4">
        <b>Total:</b> {total} <br />
        <b>Cash:</b>{" "}
        <input
          type="number"
          className="border"
          value={cash}
          onChange={(e) => setCash(e.target.value)}
        />
        <br />
        <b>Change: {cash && parseFloat(cash) - total}</b>
        <br />
        <div className="flex justify-end w-full p-4">
          <button
            onClick={handleSaveTransaction}
            className="bg-slate-700 px-4 py-2 font-light text-white"
          >
            Save Transaction
          </button>
        </div>
      </div>
    </>
  )
}
