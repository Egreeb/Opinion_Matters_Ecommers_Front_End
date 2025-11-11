import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../Context/AppContext'
import ShoworderProduct from './ShoworderProduct'

const OrderConfirm = () => {
    const { userOrder,userAddress} = useContext(AppContext)
    const [latestorder, setlatesOrder] = useState({})
    const [qty, setqty] = useState(0)
    const [price, setPrice] = useState(0)



    useEffect(() => {
        if (userOrder) {
            setlatesOrder(userOrder[0]);
        }
    }, [userOrder])

    console.log(latestorder)
  return (
    <>
        <div className='container my-5'>
            <h1 className='text-center'> Your Order has been confirm</h1>
            <h3 className='text-center'>it will delivered soon</h3>
        </div>

        <div className='container'>
            <table className='table table-sm table-dark checkout text-center table-bordered'>
                <thead>
                    <tr>
                        <th style={{ width: "50%" }}>Prdouct Detailes</th>
                        <th> Order Details & Shipping Detailes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {/* // prdouct details */}
                            <ShoworderProduct order_items={latestorder?.orderItems} />

                        </td>
                        <td>
                            <ul>
                                <li>Order Id: {latestorder?.orderId}</li>
                                <li>PaymentId: {latestorder?.Paymentid}</li>
                                <li>Payment Status: {latestorder?.PayStatus}</li>
                                <li>Order Date: {latestorder?.orderDate}</li>
                                <li>Name: {latestorder?.userShipping?.fullname}</li>
                                <li>Phone: {latestorder?.userShipping?.phoneNumber}</li>
                                <li>Country: {latestorder?.userShipping?.country}</li>
                                <li>State: {latestorder?.userShipping?.state}</li>
                                <li>City: {latestorder?.userShipping?.city}</li>
                                <li>PinCode: {latestorder?.userShipping?.pincode}</li>
                                <li>Address: {latestorder?.userShipping?.address}</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>


        </div>
    </>
  )
}

export default OrderConfirm