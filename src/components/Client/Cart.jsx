import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../Context/AppContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const navigate = useNavigate()
    const {Clienttoken,userCart,getProduct,removeFromCart,AddtoCart,decreseQty} = useContext(AppContext)
    const [price, setprice] = useState('')
    const [qty, setqty] = useState('')
    // console.log(Clienttoken)
    // console.log(getProduct)


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
    setprice(price)
},[userCart])


  return (
    <>
        <div className="container">            
                <>
                {userCart?.items?.length == 0 ? 
                    <div className='text-center'>
                            <h3>Card Is Empty</h3>
                            <button className='btn btn-warning'>Continue Shopping....</button>
                    </div>
                :   
                    <div className="shopping-cart mt-5">
                        <div className='card'>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className="col-md-8">
                                        <div className="left">
                                            <div className='shop-text'><h5>Shopping Cart</h5><h5> {userCart?.items?.length} Items</h5></div><hr />
                                            {/* table section here */}
                                            <table className="table table-responsive">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">PRODUCT DETAILES</th>
                                                        <th scope="col">QUANTITY</th>
                                                        <th scope="col">PRICE</th>
                                                        <th scope="col">TOTAL</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {userCart?.items?.map((data)=> {
                                                        const productEachprice = getProduct?.find((item)=> item._id == data.productId)
                                                        return (                                                           
                                                            <tr key={data._id}>
                                                                <td className='w-30'>
                                                                    <div className='d-flex align-items-center'>
                                                                        <div className='img-cart'>
                                                                            <img src={data.imgUrl} alt="" />
                                                                        </div>
                                                                        <div className='img-text ml-3'>
                                                                            <p>{data?.title}</p>
                                                                                <small>
                                                                                    <button className='btn btn-danger btn-sm' onClick={() => {
                                                                                        if (confirm(`Are you sure you want to remove ${data?.title}`)) {
                                                                                            removeFromCart(data?.productId)
                                                                                        }
                                                                                    }
                                                                                    }>
                                                                                        Remove
                                                                                    </button>
                                                                            </small>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className='align-middle w-40'>
                                                                    <div className='qty-btn'>
                                                                        <button className='btn' onClick={()=>decreseQty(productEachprice?._id,1)}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="tabler-icon tabler-icon-minus "><path d="M5 12l14 0"></path></svg>
                                                                        </button>
                                                                        <span>{data.productQty}</span>
                                                                        <button className='btn' onClick={()=> AddtoCart(productEachprice?._id, productEachprice?.title,productEachprice?.price,productEachprice?.imgUrl,1)}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-plus "><path d="M12 5l0 14"></path><path d="M5 12l14 0"></path></svg>
                                                                        </button>
                                                                        {/* productId, title,price,imgUrl,productQty */}
                                                                    </div>
                                                                </td>
                                                                <td className='align-middle w-15'>{productEachprice?.price}</td>
                                                                <td className='align-middle w-15'>{data.price}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="right-side">
                                            <h5>Order Summary</h5><hr />
                                            <div className='form-group'>
                                                <label htmlFor="">Shipping</label>
                                                <input type="text" className='form-control' />
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor="">PROMO CODE</label>
                                                <input type="text" className='form-control' placeholder='Enter your code' />
                                            </div>
                                            <button className='btn btn-sm btn-danger pr-4 pl-4'>Apply</button><hr /><br />
                                            <div className='shop-text'><h6>TOTAL COST</h6><h6>{price}</h6></div><br />
                                            <button className='btn btn-danger btn-sm btn-block' onClick={()=> navigate('/shipping')}>CHECKOUT</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </>
        </div>
        <br /><br /><br />

    </>
  )
}

export default Cart