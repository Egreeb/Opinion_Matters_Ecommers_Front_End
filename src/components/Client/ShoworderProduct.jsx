import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../../Context/AppContext'


const ShoworderProduct = ({order_items}) => {
const navigate = useNavigate()
  const {cart, addtoCart, DecreaseQty, products, RemoveCartItem, userAddress,url,userProf, clearCart} = useContext(AppContext)
  const [qty, setqty] = useState(0)
  const [price, setPrice] = useState(0)


  useEffect(()=>{
      if (!order_items) return
    let qty = 0
    let price = 0
    for (let i=0; i< order_items?.length; i++) {
      qty += order_items[i].productQty;
      price += order_items[i].price;
    }
    setqty(qty)
    setPrice(price)
  },[order_items])


  return (
    <>
          <table className="table table-sm table-dark table-bordered">
              <thead>
                  <tr>
                      <th scope="col">Product Img</th>
                      <th scope="col">Title</th>
                      <th scope="col">Price</th>
                      <th scope="col">Qty</th>
                  </tr>
              </thead>
              <tbody className='text-center'>
                  {order_items?.map((data) => {
                      return (
                          <>
                              <tr key={data._id}>
                                  <td>
                                      <img src={data?.imgUrl} alt="" width={"50px"} />
                                  </td>
                                  <td>{data?.title}</td>
                                  <td className='align-middle w-40'>
                                      {data?.price}
                                  </td>
                                  <td className='align-middle w-15'>{data?.productQty}</td>
                    
                              </tr>
                          </>
                      )
                  })}
                  <tr>
                      <td></td>
                      <td>Total Price:-</td>
                      <td><button className='btn btn-warning'>{price}</button></td>
                      <td><button className='btn btn-primary'>{qty}</button></td>
                  </tr>
              </tbody>
          </table>
    </>
  )
}

export default ShoworderProduct