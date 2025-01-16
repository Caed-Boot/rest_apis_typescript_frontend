import { safeParse, number, parse, transform, pipe, string } from "valibot";
import axios from "axios";
import { DraftProductSchema, ProductsSchema, Product, ProductSchema } from "../types";
import { toBoolean } from "../utils";

type ProducData = {
    [k: string]: FormDataEntryValue
}

export async function addProduct(data : ProducData) {

    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        //AQUI SE CREAN INSERTAN LOS PRODUCTOS EN LA BASE DE DATOS
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })     
        } else {
            throw new Error ('Datos no validos')
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios(url)

        const result = safeParse(ProductsSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error ('Hubo un error')
        }        
    } catch (error) {
        console.log(error);
        
    }
}

export async function getProductsById(id : Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios(url)

        const result = safeParse(ProductSchema, data.data)
        
        if (result.success) {
            return result.output
        } else {
            throw new Error ('Hubo un error')
        }        
    } catch (error) {
        console.log(error);
        
    }
}

export async function updateProduct(data : ProducData, id : Product['id']) {

    try {

        const NumberSchema = pipe(string(),transform(Number), number())

        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        })

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)
            console.log(result.output);
            
        }
    } catch (error) {
        console.log(error);
        
    }
}

export async function deleteProduct (id: Product['id']) {
    
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
    console.log(id);
    
}

export async function updateProductAvailability (id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error);
        
    }
}