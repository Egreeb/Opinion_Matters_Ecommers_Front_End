import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AppContext from '../Context/AppContext'
import { toast, Bounce } from 'react-toastify'

const EditProduct = () => {
const {id} = useParams()
const {GetProductById, UpdateProduct} = useContext(AppContext)
const navigate = useNavigate()
const [loader, setloader] = useState(false)
useEffect(()=>{
    const getProduct = async()=>{    
        const res = await GetProductById(id)
        console.log(res.product)
        setFormdata({
            product_title: res.product.title,
            product_category: res.product.category,
            product_desc: res.product.desc,
            product_qty: res.product.productQty,
            product_price: res.product.price,
            productImage: res.product.imgUrl,
            featured: res.product.featured || false, // ✅ include this
        })
    }
        getProduct()
},[])


// // console.log(id)

  const [formData, setFormdata] = useState({
    product_title:"",
    product_category:"",
    product_desc: "",
    product_qty :"",
    product_price: "",
    productImage : "",
    featured: false,
  })

  console.log(formData)
//   console.log(formData)
    const handleinput = (e) =>{
        const {name,value} = e.target
        setFormdata({...formData, [name]:value})
    }
   
    const handleSubmit = async(e)=>{
        e.preventDefault()
        setloader(true)
        const updatedData = {
            title: formData.product_title,
            desc: formData.product_desc,
            price: formData.product_price,
            category: formData.product_category,
            imgUrl: formData.productImage,
            productQty: formData.product_qty,
            featured: formData.featured, // 👈 include this line
        };
        try {
            const res = await UpdateProduct(id, updatedData);
            if (res.success) {
                setTimeout(() => {
                    toast.success(res.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                    setFormdata("")
                    navigate('../product')
                }, 2000);

            } else {
                setloader(false)
                toast.error(res.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            }
            
        } catch (error) {
            console.error(error);
            alert("❌ Update failed!");
        }
    }


  return (
    <>
        <div className="container products mt-5">
            <div className="card">
                <div className="card-header ">
                    <h3>Update Product</h3>
                    <Link to={'../product'}><button className='btn btn-info'> View Products</button></Link>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className='col-md-6'>
                                <div className="form-group">
                                    <label htmlFor="">Title of the Product:-</label>
                                    <input type="text" value={formData.product_title} name='product_title' onChange={handleinput} className='form-control' placeholder='Product Title...' required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="inputState">Product Category</label>
                                    <select id="inputState" value={formData.product_category} name='product_category' onChange={handleinput} className="form-control" required>
                                        <option value="">Select Category</option>
                                        <option >Mobiles</option>
                                        <option>Accessories</option>
                                        <option>Garments</option>
                                        <option>Furniture</option>
                                        <option>Free Stuff</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-md-12'>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"  checked={formData.featured} onChange={(e)=>setFormdata({...formData, featured: e.target.checked})}/>
                                        <label class="form-check-label" for="defaultCheck1">
                                            Featured This Product ?
                                        </label>
                                </div>
                            </div><br /><br />
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1">Product Description:-</label>
                                    <textarea name='product_desc' value={formData.product_desc} onChange={handleinput} className="form-control" id="exampleFormControlTextarea1" rows="8" placeholder='Type Here...' required></textarea>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label htmlFor="">Product Quantity:-</label><br />
                                    <div className='qtyfunc'>
                                        <a className='btn btn-primary'>-</a>
                                        <input type="number" value={formData.product_qty} name='product_qty' onChange={handleinput} className='form-control quantity-input' required />
                                        <a className='btn btn-primary'>+</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="">Price Of the Product</label>
                                    <input type="number" value={formData.product_price} name='product_price' onChange={handleinput} className='form-control' placeholder='Product Price...' required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="">Product Image URL</label>
                                    <input type="text" value={formData.productImage} name='productImage' onChange={handleinput} className='form-control' placeholder='Image URL here..' required />
                                </div>
                            </div>
                            <div className="col-md-12 mt-2">
                                <button className='btn btn-success btn-block'>
                                      {loader ?
                                          <>
                                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Please wait...
                                          </> : "UPDATE"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default EditProduct