import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const ListProduct = () => {
	const [products, setProducts] = useState([])    
	useEffect(() => {
        getProducts();
    },[])    
const getProducts = async() => {
		const products = await axios.get('http://localhost:8080/products')
        setProducts(products.data)
    }    
	const deleteProduct = async (id) => {
        await axios.delete('http://localhost:8080/products/${id}')
        getProducts()
    }    
return (
        <div>
            <Link to="/add" className="button is-primary mt-5">Add New Item</Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th width="150">Action</th>
                        <th>No</th>                        
                        <th>Name</th>
                        <th>Price</th>                        
                    </tr>
                </thead>
                <tbody>
                    { products.map((product, index) => (
                        <tr key={product.id}>
                            <td>
                                <Link to={`/edit/${product.id}`} className="button is-small is-info">Edit</Link>
                                &nbsp;
                                <button onClick={() => deleteProduct(product.id)} className="button is-small is-danger">Delete</button>
                            </td>
                            <td>{index + 1}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>                            
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
};export default ListProduct