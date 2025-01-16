import { ActionFunctionArgs, Form, useNavigate, redirect, useFetcher } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps = {
   product: Product
}

export async function action({params} : ActionFunctionArgs) {
    
    if (params.id !== undefined) {
        
        await deleteProduct(+params.id)
        return redirect('/')
    }

    return null
}

export default function ProductDetails({product} : ProductDetailsProps) {
    
    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isAvailable = product.availability
    
    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}

            </td>
            <td className="p-3 text-lg text-gray-800">

                <fetcher.Form method="POST">
                    <button
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`${isAvailable ? 'text-green-600 border-green-600' : 'text-red-600 border-red-600'} border rounded-lg uppercase font-semibold w-full hover:cursor-pointer`}
                    >
                        {isAvailable ? 'Disponible' : 'No Disponible'}
                    </button>
                </fetcher.Form>

            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`/productos/${product.id}/editar`)}
                        className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:bg-indigo-700 transition"
                    >Editar</button>

                    <Form
                        className="w-full"
                        method="POST"
                        action={`productos/${product.id}/eliminar`}
                        onSubmit={(event) => {
                            if ( !confirm('Quieres eliminar este Producto?')) {
                                event.preventDefault()
                            }
                        }}
                    >
                        <input 
                            type="submit" 
                            value='Eliminar'
                            className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer hover:bg-red-700 transition"
                        />
                    </Form>
                </div>
            </td>
        </tr> 
    )
}
