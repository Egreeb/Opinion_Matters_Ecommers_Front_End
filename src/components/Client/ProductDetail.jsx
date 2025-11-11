import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { data, useNavigate, useParams } from 'react-router-dom'
import AppContext from '../../Context/AppContext'

const ProductDetail = () => {
    const {AddtoCart,userCart,decreseQty,isauthenticated,url} = useContext(AppContext)
    const [product, setProducts] = useState()
    const {id} = useParams()
    const navigate = useNavigate()
    // console.log(id)
    
    const CartProductById = userCart?.items?.find((item)=> item.productId == product?._id)

    console.log(CartProductById)
// fetching api for matched id 
    useEffect(()=>{
        // const url = "http://localhost:8000/api"

        const getProductById = async()=>{
            const api = await axios.get(`${url}/product/get/${id}`, {
                headers:{
                    "Content-Type": "application/json"
                },
                withCredentials:true
            });
            setProducts(api.data.product)
        }
        getProductById()

    },[id])


  return (
    <>
          <div className='container'>
              <div className='row'>
                  <div className='col-md-6'>
                      <div className='product-detail-img text-center'>
                          <img src={product?.imgUrl} alt="" width={'250px'} height={"300px"} />
                      </div>
                  </div>
                  <div className='col-md-6'>
                      <div className='product-det-text'>
                          <h1 className='mb-3'>{product?.title}</h1>
                          <p className='mb-3'>Category: {product?.category}</p>
                          <p className='mb-3'>Rated: A+ </p>
                          <h2>{product?.price}</h2>
                          <p className='mb-3'>Stock Awailable</p>
                          {CartProductById?
                                <div className="productqtyfunc">
                                    <a className="btn" onClick={()=> decreseQty(CartProductById?.productId,1)}>-</a>
                                    <span className='ml-3 mr-3'>{CartProductById?.productQty}</span>
                                    <a className="btn" onClick={()=>AddtoCart(product?._id, product?.title, product?.price, product?.imgUrl,1)}>+</a>
                                </div>
                          : 
                            <button className='btn' onClick={()=>{
                                if(!isauthenticated){
                                    navigate('/clientlogin')
                                    return
                                }
                                AddtoCart(product?._id, product?.title, product?.price, product?.imgUrl,1)
                            }}>Add To Cart</button>
                        }
                      </div>
                  </div>
              </div> <br /><br /><br /><br />
              <div className='descpage'>
                  <button className='btn'>Description</button>
                  <button className='btn'>Review</button>
                  <hr />
                  <h3>Specification</h3>
                  <p>{product?.desc}</p>
              </div> <br /><br /><br /><br />
              {/* <RelatedProduct category={product?.category} /> */}
          </div>
    </>
  )
}

export default ProductDetail