import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import Joi from 'joi'
import { resetUpdateProduct, updatingProductRequest } from "../../../store/admin/products/products"
import Input from '../auth/Input'
import { getProductDetails, clearingProductDetail } from "../../../store/productDetails"
import Metadata from '../products/Metadata'
import Sidebar from './Sidebar'
const UpdateProduct = ({ match }) => {

    const dispatch = useDispatch()
    const { uPLoading, isUpdated, uPError } = useSelector(state => state.newAdmin.products)
    const { data: productDetail } = useSelector(state => state.entities.productDetail)
    const [msg, setMsg] = useState("")
    useEffect(() => {
        dispatch(getProductDetails(`/api/v1/product/${match.params.id}`))
        return () => {
            dispatch(clearingProductDetail())
        }
    }, [dispatch, match])
    useEffect(() => {
        if (productDetail) {
            const pro = { ...product }
            pro.product.category = productDetail.category;
            pro.product.description = productDetail.description;
            pro.product.name = productDetail.name
            pro.product.seller = productDetail.seller
            pro.product.price = String(productDetail.price)
            pro.product.stock = String(productDetail.stock)
            setProduct(pro)
            setOldImages(productDetail.images)
        }
        // eslint-disable-next-line
    }, [productDetail])
    const history = useHistory()

    const initialState = {
        product: {
            name: "",
            price: "",
            description: "",
            category: "",
            stock: "",
            seller: "",
        },
        errors: {
            name: "",
            price: '',
            description: "",
            category: "",
            stock: '',
            seller: ""
        }
    }
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])
    const [oldImages, setOldImages] = useState([])
    const [product, setProduct] = useState(initialState)
    const categories = [
        'Electronics',
        'Accessories',
        'Food',
        'Books',
        'Clothes',
        'Shoes',
        'Beauty',
        'Sports'
    ]
    useEffect(() => {
        if (isUpdated) {
            setMsg("Product hass been Updated Successfully")
            setTimeout(() => {
                setMsg("")
                history.push('/admin/products')

            }, 2000)
        }

        return () => {
            dispatch(resetUpdateProduct())
        }
        // eslint-disable-next-line
    }, [dispatch, uPError, isUpdated, history])

    const onChange = (e) => {

        const errors = validation()
        const newData = { ...product }
        newData.errors = errors || {}
        newData.product[e.currentTarget.name] = e.currentTarget.value
        setProduct(newData)
    }
    const handleChangeImages = (e) => {

        const files = Array.from(e.target.files)
        setImages([])
        setImagesPreview([])
        setOldImages([])
        files.forEach(file => {
            if (file) {
                if (file.type.includes("png") || file.type.includes("jpeg") || file.type.includes("jpg")) {

                    const reader = new FileReader()
                    reader.onload = () => {
                        if (reader.readyState === 2) {
                            setImagesPreview(old => [...old, reader.result])
                            setImages(old => [...old, reader.result])
                        }
                    }
                    reader.readAsDataURL(file)
                }
            }
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const errors = validation()
        const newData = { ...product }
        newData.errors = errors || {}
        setProduct(newData)
        if (errors) { return null };


        const formData = new FormData()
        const { name, price, category, description, stock, seller } = product.product
        formData.set('name', name)
        formData.set('price', Number(price))
        formData.set('category', category)
        formData.set('description', description)
        formData.set('stock', Number(stock))
        formData.set('seller', seller)

        images.forEach(img => {
            formData.append("images", img)
        })

        dispatch(updatingProductRequest(match.params.id, formData))

    }
    const validation = () => {
        const schema = Joi.object({
            name: Joi.string().min(3).max(255).required(),
            price: Joi.string().min(1).max(10).required(),
            category: Joi.string().min(3).max(255).required(),
            description: Joi.string().min(3).max(1024).required(),
            stock: Joi.string().max(20).required(),
            seller: Joi.string().min(3).max(255).required()

        })
        const { error } = schema.validate(product.product)
        if (!error) return null
        const errors = {}
        for (let item of error.details) errors[item.path[0]] = item.message
        return errors
    }
    return (
        <>
            <div className="row minHeight">
                <div className="col-12 col-md-3 bg-dark" style={{ marginTop: "-1rem" }}>
                    <Sidebar />
                </div>
                <div className="col-12 mt-3 col-md-7">
                    {msg && <div className="alert alert-info">{msg}</div>}
                    <div >
                        <Metadata title="Update Product" />

                        <div className="d-flex align-item-center justify-content-center">
                            <div className="card w-50">
                                <div className="card-header h2 text-dark">
                                    New Product
                </div>
                                <div className="card-body">
                                    <form onSubmit={handleOnSubmit}>
                                        <Input
                                            label="Name"
                                            error={product.errors.name}
                                            value={product.product.name}
                                            onChange={onChange}
                                            name="name"
                                            type="text"
                                        />
                                        <Input
                                            label="Price"
                                            error={product.errors.price}
                                            value={product.product.price}
                                            onChange={onChange}
                                            name="price"
                                            type="number"
                                        />
                                        <div className="form-group">
                                            <label htmlFor="name">Description</label>
                                            <textarea name="description" cols="5" rows="3" className={`form-control ${product.errors.description ? "is-invalid" : ""}`}
                                                value={product.product.description}
                                                onChange={onChange}
                                            ></textarea>

                                            {product.errors.description &&
                                                <div className="invalid-feedback">
                                                    {product.errors.description}
                                                </div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="category">Category</label>
                                            <select
                                                id="category"
                                                name="category"
                                                className={`form-control ${product.errors.category ? "is-invalid" : ""}`}
                                                onChange={onChange}
                                                value={product.product.category}
                                                type="text"
                                            >
                                                {categories.map(category => (
                                                    <option
                                                        key={category}
                                                        value={category}
                                                    >{category}</option>
                                                ))}

                                            </select>
                                            {product.errors.category &&
                                                <div className="invalid-feedback">
                                                    {product.errors.category}
                                                </div>}
                                        </div>
                                        <Input
                                            label="Stock"
                                            error={product.errors.stock}
                                            value={product.product.stock}
                                            onChange={onChange}
                                            name="stock"
                                            type="number"
                                        />
                                        <Input
                                            label="Seller"
                                            error={product.errors.seller}
                                            value={product.product.seller}
                                            onChange={onChange}
                                            name="seller"
                                            type="text"
                                        />
                                        <div className="row my-3">

                                            <div className="col-12">
                                                <div className="custom-file">
                                                    <input
                                                        type="file"
                                                        name="avatar"
                                                        className="custom-file-input"
                                                        id="customFile"
                                                        multiple
                                                        onChange={handleChangeImages}
                                                    />
                                                    <label className="custom-file-label" htmlFor="customFile">Images</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                {imagesPreview.length !== 0 ? (
                                                    imagesPreview.map(img => (
                                                        <img
                                                            key={Math.random() * 123456789}
                                                            src={img} alt="images"
                                                            className="mx-2"
                                                            style={{ width: "15%", height: "100%" }}
                                                        />
                                                    ))
                                                ) : (
                                                    oldImages && oldImages.map(img => (
                                                        <img src={img.url}
                                                            key={Math.random() * 123456789}
                                                            alt="images"
                                                            className="mx-2"
                                                            style={{ width: "15%", height: "100%" }}
                                                        />
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                        <input
                                            type="submit"
                                            value="Submit"
                                            className="btn btn-warning  btn-lg btn-block"
                                            onClick={handleOnSubmit}
                                            disabled={uPLoading ? true : false}
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateProduct
