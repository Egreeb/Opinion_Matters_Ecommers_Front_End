import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../Context/AppContext'
import { Link, useParams } from 'react-router-dom' 

const SearchProduct = () => {
    const {getProduct,Clienttoken,AddtoCart, userCart,decreseQty} = useContext(AppContext)
    const [filtedata, setfilterdata] = useState([])
    const {key} = useParams()
useEffect(()=>{
    const filter = getProduct.filter((data)=> data?.title?.toLowerCase().includes(key.toLowerCase()) )
    setfilterdata(filter)
},[key])

console.log(filtedata)
  return (
    <>
        <div className='container homepage-card'>
            {(filtedata.length > 0 ? 
            <div className='row'>
                {filtedata?.map((data)=>{
                  const cartItems = userCart?.items?.find((item) => item.productId == data._id)
                  return(
                  <div key={data._id} className="col-md-3 mb-4" style={{ width: '16rem' }}>
                    <div className='card'>
                      <div className='image-holder mt-3'>
                        <Link to={`/productdetail/${data._id}`}>
                          <img src={`${data.imgUrl}`} className="card-img-middle" alt="..." />
                        </Link>
                      </div>
                      <div className="card-body custom_card_body">
                        <div className='flex'>
                          <div className='left'>
                            <p><b>{data.title}</b></p>
                            <p>Rating Is XXX</p>
                            <p>{data.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  )
                }
                )}
            </div>
            : <h3 className='text-center text-danger'> <i className='fa fa-times'> </i> No Matching Products Found. Please Try a Different Keyword.</h3>)}
          </div>
    </>
  )
}

export default SearchProduct