import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppContext from '../Context/AppContext'
const Product = () => {
const {getProduct, deleteSpecPrdocut} = useContext(AppContext)
const navigate = useNavigate()
  return (
    <>
    <div className="container products mt-5">
        <div className="card">
            <div className="card-header">
                <h3>All Products</h3>
                <Link to={'../addproduct'}><button className='btn btn-info'> + Add product</button></Link>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead className='thead-dark'>
                  <tr>
                    <th>Product Image</th>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Edit</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {getProduct?.map((data) => {
                    return (
                      <tr key={data._id}>
                        <td><img src={data.imgUrl} alt="" width={'70px'}/></td>
                        <td>{data.title}</td>
                        <td>{data.productQty}</td>
                        <td>{data.price}</td>
                        <td>
                          <button className='btn btn-info btn-sm' onClick={()=>navigate(`../eddproduct/${data._id}`)}>Edit</button>
                        </td>
                        <td>
                          <button className='btn btn-danger btn-sm' onClick={()=> deleteSpecPrdocut(data._id)}>Delete</button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
        </div>
    </div>
    </>
  )
}

export default Product