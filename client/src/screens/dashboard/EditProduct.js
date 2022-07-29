import { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TwitterPicker } from "react-color"; //For Colors
import { v4 as uuidv4 } from 'uuid'; //For unique id
//import ReactQuill from 'react-quill';
//import 'react-quill/dist/quill.snow.css';
import ScreenHeader from "../../components/ScreenHeader";
import { useAllCategoriesQuery } from "../../store/services/categoryServices";
import { useUpdateProductMutation, useGetProductQuery } from "../../store/services/productServices";
import { setSuccess } from "../../store/reducers/globalReducer";
import Spinner from "../../components/Spinner";
import Color from "../../components/Color";
import SizesList from "../../components/SizesList";
import toast, { Toaster } from 'react-hot-toast';
import swal from 'sweetalert'; //For alert box

const EditProduct = () => {

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //For ReactQuill
    // const [value, setValue] = useState('');
    // console.log(`Text Editor: ${value}`);

    //For Fetch All categories list
    const { data = [], isFetching } = useAllCategoriesQuery();
    //console.log(data, isFetching);

    //Here data = product bcz we already use data above and isFetching also
    const { data: product, isFetching: fetching } = useGetProductQuery(id);
    // console.log("data", product);

    const [state, setState] = useState({
        //state name same hona chaiya <input mai name property ka sth>
        title: '',
        price: 0,
        discount: 0,
        stock: 0,
        category: '',
        description: '',
        colors: [],
    });

    const [sizes] = useState([
        { name: 'xsm' },
        { name: 'sm' },
        { name: 'md' },
        { name: 'lg' },
        { name: 'xl' },
        { name: '1 year' },
        { name: '2 year' },
        { name: '3 year' },
        { name: '4 year' },
        { name: '5 year' },
    ]);

    //For Fetch Selected Sizes
    const [sizeList, setSizeList] = useState([]);

    //For input fields
    const handleInputs = e => {
        setState({ ...state, [e.target.name]: e.target.value }); //...state means all states
    }

    //For display colors
    const saveColors = (color) => {
        // console.log(color); //color have different properties see in console like hex,hsl,hsv, rgb etc
        //filter is javascript function,filter is for checking duplicate data, color.hex is color property check in console, 
        //uuidv4() assign unique id on every color
        const filtered = state.colors.filter((clr) => clr.color !== color.hex);
        setState({ ...state, colors: [...filtered, { color: color.hex, id: uuidv4() }] })
    }
    //   console.log(state.colors);

    //For Delete Colors
    const deleteColors = (color) => {
        const filtered = state.colors.filter(clr => clr.color !== color.color);
        setState({ ...state, colors: filtered });
    }

    //For Display Sizes
    const chooseSize = sizeObject => {
        const filtered = sizeList.filter(size => size.name !== sizeObject.name); //filter is for checking duplicate data
        setSizeList([...filtered, sizeObject])
    }
    //   console.log(sizeList);

    //For Delete Sizes
    const deleteSizes = (name) => {
        const filtered = sizeList.filter(size => size.name !== name);
        setSizeList(filtered);
    }

    //For Save Product Data
    const [updateProduct, response] = useUpdateProductMutation();
    // console.log('Your Response', response);

    const saveProduct = e => {
        e.preventDefault();
        // console.log("Product Data",state);
        updateProduct(state);

    }
    //For Showing Validation errors
    useEffect(() => {
        if (!response.isSuccess) {
            response?.error?.data?.errors.map(err => {
                toast.error(err.msg) //msg is from backend ProductController.js
            })
        }
    }, [response?.error?.data?.errors])

    useEffect(() => {
        if (response?.isSuccess)  //response?.isSuccess is in console
        {
            //setSuccess for check backend errors
            dispatch(setSuccess(response?.data?.msg)) //-->send to globalReducer in function setSuccess action.payload
            swal({  //For alert box
                title: "Product Updated Successfully!",
                icon: "success",
            });
            navigate('/dashboard/products');
        }
    }, [response?.isSuccess])


    //Show Data in Textboxes
    useEffect(() => {
        if (!fetching) {
            setState(product)
            setSizeList(product.sizes)
        }
    }, [product])
    // console.log("Status", state);


    return (
        <Wrapper>
            <ScreenHeader>
                <Link to="/dashboard/products" className="btn-navyblue">
                    <i className="bi bi-arrow-left-circle mr-1 inline-block text-lg px-1 py-1 cursor-pointer transition-all"></i>
                    Product List
                </Link>
            </ScreenHeader>

            <Toaster position="top-right" reverseOrder={true} />

            {!fetching ? <div className="flex flex-wrap -mx-3">
                <form className="w-full xl:w-8/12 p-3" onSubmit={saveProduct}>
                    <h3 className="text-lg mb-3 text-black font-semibold">Edit Product</h3>
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="title" className="label">Title</label>
                            <input type="text" className="form" name="title" id="title"
                                placeholder="Title..." onChange={handleInputs} value={state.title} />
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="price" className="label">Price</label>
                            <input type="number" className="form" name="price" id="price"
                                placeholder="Price..." onChange={handleInputs} value={state.price} />
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="discount" className="label">Discount</label>
                            <input type="number" className="form" name="discount" id="discount"
                                placeholder="Discount..." onChange={handleInputs} value={state.discount} />
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="stock" className="label">Stock</label>
                            <input type="number" className="form" name="stock" id="stock"
                                placeholder="Stock..." onChange={handleInputs} value={state.stock} />
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="categories" className="label">Categories</label>
                            {!isFetching ? data?.categories?.length > 0 &&  //For Select Category
                                <select name="category" id="categories" className="form"
                                    onChange={handleInputs} value={state.category}>
                                    <option value="">Choose Category</option>
                                    {data?.categories?.map(category => (
                                        <option value={category.name} key={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                : <Spinner />}
                        </div>
                        <div className="w-full p-3">
                            <label htmlFor="colors" className="label">Choose Colors</label>
                            <TwitterPicker onChangeComplete={saveColors} />
                        </div>
                        <div className="w-full p-3">
                            <label htmlFor="sizes" className="label">Choose Sizes</label>
                            {/* For Sizes */}
                            {sizes.length > 0 && <div className="flex flex-wrap -my-1 -mx-6 ml-[-6px]">
                                {sizes.map(size => (
                                    <div key={size.name} className="size"
                                        onClick={() => chooseSize(size)}
                                    >{size.name}  {/* name is in state */}
                                    </div>
                                ))}
                            </div>}
                        </div>
                        <div className="w-full p-3">
                            <label htmlFor="description" className="label">Description</label>
                            {/* <ReactQuill theme="snow" id="description" value={value} onChange={setValue}
                           placeholder="Description...."/> */}
                            <textarea type="text" className="form_description" id="description" name="description"
                                placeholder="Description..."
                                value={state.description} onChange={handleInputs} />
                        </div>
                        <div className="w-full p-3">
                            <input type="submit" value={response.isLoading ? 'loading...' : 'Save Product'}
                                disabled={response.isLoading ? true : false}
                                className="btn-red" />
                        </div>
                    </div>
                </form>
                <div className="w-full xl:w-4/12 p-3">
                    <Color colors={state.colors} deleteColors={deleteColors} /> {/*//send to Color.js */}
                    <SizesList list={sizeList} deleteSizes={deleteSizes} />
                </div>

            </div>
                : <Spinner />}


        </Wrapper>
    );
};

export default EditProduct;