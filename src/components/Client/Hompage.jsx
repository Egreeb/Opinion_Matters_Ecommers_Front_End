import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../Context/AppContext'
import banner_1 from '../../assets/banner1.jpg'
import banner_2 from '../../assets/banner2.jpg'
import banner_3 from '../../assets/banner3.jpg'
import star from '../../assets/star.png'
// import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Footer from './footer'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Hompage = () => {
  const {getProduct,Clienttoken,AddtoCart, userCart,decreseQty} = useContext(AppContext)
  // console.log(getProduct)
  // MAKE PRODUCT GROUPED BY CATEGORY USING REDUCE METHOD
  // getProduct = [
  //   {title:"", cate:"",},
  //   {title:"", cate:"",},
  //   {title:"", cate:"",},
  // ]


  
 const groupBycate = getProduct.reduce((acc, item)=>{
  const key = item.category
  if(!acc[key]){
    acc[key] = []
  }
  acc[key].push(item)
  return acc
 },{})
  
//  console.log(groupBycate)


  // find and filter by featured product

  const filterbyFeatured = getProduct?.filter((item)=> item.featured)
  console.log(filterbyFeatured)

  const isLoading = !getProduct || getProduct.length === 0;

  return (
    <>
    {/* // SLIDER */}
    <div className='slider'>
        <div className="bd-example">
          {/*  */}
          <div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-ride="carousel">
            {/* <ol className="carousel-indicators">
              <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            </ol> */}
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={banner_1} className="d-block w-100" alt="..." />
                  <div className="carousel-caption-cust">
                    <div className="swiper-slide-contents animated fadeInRight">
                      <div className="elementor-slide-sub-title">Flat 20% Discount</div>
                      <div className="elementor-slide-heading">Shop the Latest Trends  <br />New Arrivals Just Dropped!</div>
                      <div className="elementor-slide-description">Starting From <span className="cms-price">AED 499 /-</span>
                      </div>
                      <a href="#" className="elementor-button elementor-slide-button btn btn-primary">Shop Now </a>
                    </div>
                  </div>
              </div>
              <div className="carousel-item ">
                <img src={banner_2} className="d-block w-100" alt="..." />
                  <div className="carousel-caption-cust ">
                    <div className="swiper-slide-contents animated fadeInRight">
                      <div className="elementor-slide-sub-title title2">Flat 20% Discount</div>
                      <div className="elementor-slide-heading title2">Style That Speaks <br /> Discover Your Look Today</div>
                      <div className="elementor-slide-description title2">Starting From <span className="cms-price title2">AED 599 /-</span>
                      </div>
                      <a href="#" className="elementor-button elementor-slide-button btn btn-primary ">Shop Now </a>
                    </div>
                  </div>
              </div>
              <div className="carousel-item">
                <img src={banner_3} className="d-block w-100" alt="..." />
                  <div className="carousel-caption-cust ">
                    <div className="swiper-slide-contents animated fadeInRight">
                      <div className="elementor-slide-sub-title">Flat 20% Discount</div>
                      <div className="elementor-slide-heading">From casual wear to <br /> evening elegance</div>
                      <div className="elementor-slide-description">From <span className="cms-price">AED 399 /-</span>
                      </div>
                      <a href="#" className="elementor-button elementor-slide-button btn btn-primary">Shop Now </a>
                    </div>
                  </div>
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
    </div>
{/* SLIDER END HERE */}
      <div className='container homepage-card'>
        <br /><br /><br />
        <h2 className='text-center mb-5'>Featured Product</h2>
        <div className='row'>
            {filterbyFeatured?.map((data)=>{
              // const cartItems = userCart?.items?.find((item) => item.productId == data._id)
              return(
              <div key={data._id} className="col-md-3 mb-4 col-12" style={{ width: '16rem' }}>
                <div className='card'>
                  <img src={star} alt="" className='star'/>
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
        <hr />
      {/* CATEGORY WISE MAPING HERE REDUCE */}
          {Object.keys(groupBycate).map((category)=> (
            <div key={category} className='category-loop'>
              <div className='cate-heading mb-3'>
                <button className='btn btn-info cate-btn_cus'>{category}</button>
              </div>
              <div className="row">
              {groupBycate[category].map((product) => (
                      <div className="col-md-3 col-6 col-lg-2">
                        <div key={product._id} className='card cate-card mb-5'>
                            <div className="card-body text-center">
                                <Link to={`/productdetail/${product._id}`}>
                                  <img src={`${product.imgUrl}`} className="caro-img" alt="..." />
                                </Link>
                                <h5>{product.price}</h5>
                            </div>
                        </div>
                      </div>
              ))}
              </div>
          <br />
            </div>
          ))}

      {/* CATEGORY WISE MAPING HERE REDUCE */}
      {isLoading ? (
         <div className="text-center mb-5">
            <Skeleton width={`30%`} height={30} />
            <div className="row mt-3">
              {Array(6).fill().map((_, i) => (
                <div key={i} className="col-md-2 col-6">
                  <div className="card mb-4 p-2">
                    <Skeleton height={150} />
                    <Skeleton width={`60%`} height={20} className="mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
      ) :(
          Object.keys(groupBycate).map((category)=> (
            <div key={category} className='category-loop'>
              <div className='cate-heading mb-3'>
                <button className='btn btn-info cate-btn_cus'>{category}</button>
              </div>
              <div className="row">
              {groupBycate[category].map((product) => (
                      <div className="col-md-3 col-6 col-lg-2">
                        <div key={product._id} className='card cate-card mb-5'>
                            <div className="card-body text-center">
                                <Link to={`/productdetail/${product._id}`}>
                                  <img src={`${product.imgUrl}`} className="caro-img" alt="..." />
                                </Link>
                                <h5>{product.price}</h5>
                            </div>
                        </div>
                      </div>
              ))}
              </div>
          <br />
            </div>
          )))}
        <br /> <br /> <br /> <br />
      </div>
    </>
  )
}

export default Hompage
