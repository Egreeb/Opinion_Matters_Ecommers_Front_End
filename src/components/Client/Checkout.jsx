import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../Context/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Checkout = () => {
const {clearCart,userCart,getProduct,removeFromCart,AddtoCart,decreseQty,userAddress,url,ClientProf} = useContext(AppContext)
const navigate = useNavigate()
const [qty, setqty] = useState(0)
const [price, setPrice] = useState(0)

// console.log(ClientProf)
// TOTAL PRICE & TOTAL QTY ADDING
useEffect(()=>{
    if(!userCart?.items) return
    let qty = 0
    let price = 0
    for(let i = 0; i < userCart?.items?.length; i++){
        qty += userCart?.items[i].productQty
        price += userCart?.items[i].price
    }
    setqty(qty)
    setPrice(price)
},[userCart])


const handlePayment = async()=>{
    try {
        const orderResponse = await axios.post(`${url}/payment/checkout`, {
            amount:price, 
            qty:qty,
            cartiTems:userCart?.items,
            userShipping:userAddress, 
            userId:ClientProf._id
        })
        // console.log("Order Response", orderResponse)

        const {orderId, amount:orderderAmount} = orderResponse.data
             // Open Razorpay Checkout
      const options = {
        key: 'rzp_test_RYXELm1gdsBHSb', // Replace with your Razorpay key_id
        amount: orderderAmount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'Egreeb',
        description: 'Test Mode',
        order_id: orderId, // This is the order_id created in the backend
          handler:  async function (response) {
            const paymentData = {
                orderId:response.razorpay_order_id,
                Paymentid:response.razorpay_payment_id,
                signature:response.razorpay_signature,
                amount:orderderAmount,
                orderItems:userCart?.items,
                userId:ClientProf._id,
                userShipping:userAddress,
            }
            // console.log(paymentData)
            const api = await axios.post(`${url}/payment/verify-payment`, paymentData);
            if(api.data.success){
                clearCart()
                navigate('/orderconfirmation')
            }
          },
        prefill: {
          name: 'Egreeb Company',
          email: 'gajjudube4@gmail.com',
          contact: '+971547241907'
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
        console.error(error)
    }

}

  return (
    <>
          <div className="container">
              <>
                  <table className='table table-sm table-dark checkout text-center table-bordered table-responsive'>
                      <thead>
                          <tr>
                              <th style={{ width: "70%" }}>Prdouct Detailes</th>
                              <th>Shipping Detailes</th>
                          </tr>
                          <td>
                              <div className='my_product_table p-3'>
                                  <table className="table table-sm table-dark table-bordered table-responsive">
                                      <thead>
                                          <tr>
                                              <th scope="col">Product Img</th>
                                              <th scope="col">Title</th>
                                              <th scope="col">Price</th>
                                              <th scope="col">Qty</th>
                                              <th scope="col">Qty++</th>
                                              <th scope="col">Qty--</th>
                                              <th scope="col">Remove</th>
                                          </tr>
                                      </thead>
                                      <tbody className='text-center'>
                                          {userCart?.items?.map((data) => {
                                              const productEachprice = getProduct?.find((item)=> item._id == data.productId)
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
                                                          <td className='align-middle w-15'>
                                                              <a href="#" onClick={()=> AddtoCart(productEachprice?._id, productEachprice?.title,productEachprice?.price,productEachprice?.imgUrl,1)}><span className="material-symbols-outlined">add_circle</span></a>
                                                          </td>
                                                          <td>
                                                              <a href="#" onClick={() => decreseQty(productEachprice?._id, 1)}><span className="material-symbols-outlined">do_not_disturb_on</span></a>
                                                          </td>
                                                          <td>
                                                              <a href="#" onClick={() => {
                                                                  if (confirm(`Are you sure you want to remove ${data?.title}`)) {
                                                                      removeFromCart(data?.productId)
                                                                  }
                                                              }
                                                              }><span className="material-symbols-outlined" >delete_forever</span></a>
                                                          </td>
                                                      </tr>
                                                  </>
                                              )
                                          })}
                                          <tr>
                                              <td></td>
                                              <td>Total Price:-</td>
                                              <td><button className='btn btn-warning'>{price}</button></td>
                                              <td><button className='btn btn-primary'>{qty}</button></td>
                                              <td></td>
                                              <td></td>
                                              <td></td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </td>
                          <td>
                              <ul>
                                  <li>Name:- {userAddress?.fullname}</li>
                                  <li>Phone:-{userAddress?.phoneNumber}</li>
                                  <li>Country:-{userAddress?.country}</li>
                                  <li>State:-{userAddress?.state}</li>
                                  <li>City:-{userAddress?.city}</li>
                                  <li>PinCode:-{userAddress?.pincode}</li>
                                  <li>Address Near By:-{userAddress?.address}</li>
                              </ul>
                          </td>
                      </thead>
                  </table>
                  <div className='text-center'>
                      <button className='btn btn-success' onClick={handlePayment}>Proceed Payment</button>
                  </div>
              </>
          </div>
          <br /><br />
    </>

  )
}

export default Checkout