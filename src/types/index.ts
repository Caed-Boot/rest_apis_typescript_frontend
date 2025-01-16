import { boolean, number, object, string, array, InferOutput } from "valibot";

export const DraftProductSchema = object({
    name: string(),
    price: number(),
})

export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean()
})

export const ProductsSchema = array(ProductSchema)
// El InferOutput toma el Schema y lo convierte a un Type
export type Product = InferOutput<typeof ProductSchema>
