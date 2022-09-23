import { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TwitterPicker } from "react-color"; //For Colors
import { v4 as uuidv4 } from 'uuid'; //For unique id
//import ReactQuill from 'react-quill';
//import 'react-quill/dist/quill.snow.css';
import ScreenHeader from "../../components/ScreenHeader";
import { useAllCategoriesQuery } from "../../store/services/categoryServices";
import { useCreateProductMutation } from "../../store/services/productServices";
import { setSuccess } from "../../store/reducers/globalReducer";
import Spinner from "../../components/Spinner";
import Color from "../../components/Color";
import SizesList from "../../components/SizesList";
import ImagesPreview from "../../components/ImagesPreview";
import toast, { Toaster } from 'react-hot-toast';
import swal from 'sweetalert'; //For alert box

const CreateProduct = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //For ReactQuill
    // const [value, setValue] = useState('');
    // console.log(`Text Editor: ${value}`);

    //For Fetch All categories list
    const { data = [], isFetching } = useAllCategoriesQuery();
    //console.log(data, isFetching);

    const [state, setState] = useState({
        //state name same hona chaiya <input mai name property ka sth>
        title: '',
        price: 0,
        discount: 0,
        stock: 0,
        category: '',
        description: '',
        colors: [],
        image1: '',
        image2: '',
        image3: ''
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

    //For Preview Images
    const [preview, setPreview] = useState({
        image1: '',
        image2: '',
        image3: ''
    });
    const imageHandle = e => {
        //console.log(e.target.files); //-->See output files have different properties
        if (e.target.files.length !== 0) {
            setState({ ...state, [e.target.name]: e.target.files[0] }); //e.target.files[0] assign to [e.target.name]
            const reader = new FileReader(); //FileReader() is built-in javascript function/class
            reader.onloadend = () => { //onloadend available in FileReader()
                setPreview({ ...preview, [e.target.name]: reader.result });
            }
            reader.readAsDataURL(e.target.files[0]); //readAsDataURL available in FileReader()
        }
    }
    // console.log(preview);

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
    const [createNewProduct, response] = useCreateProductMutation();
    // console.log('Your Response', response);

    const saveProduct = e => {
        e.preventDefault();
        const formData = new FormData(); //FormData() is object, Call for all state data
        //Send Data as a JSON object bcz we have also array in state
        formData.append('Data', JSON.stringify(state)); //Data is name use any name which you want
        //For sizes , selected sizes store in sizeList state
        formData.append('Sizes', JSON.stringify(sizeList));
        //images ko as a JSON send nhi krskay that why we send seperately
        formData.append('Image1', state.image1);
        formData.append('Image2', state.image2);
        formData.append('Image3', state.image3);
        createNewProduct(formData); //Create Function and call in const [] = useCreateProductMutation();
        //console.log(state);
        //console.log(sizeList);
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
                title: "Product Added Successfully!",
                icon: "success",
            });
            navigate('/dashboard/products');
        }
    }, [response?.isSuccess])

    return (
        <Wrapper>
            <ScreenHeader>
                <Link to="/dashboard/products" className="btn-navyblue">
                    <i className="bi bi-arrow-left-circle mr-1 inline-block text-lg px-1 py-1 cursor-pointer transition-all"></i>
                    Product List
                </Link>
            </ScreenHeader>

            <Toaster position="top-right" reverseOrder={true} />

            <div className="flex flex-wrap -mx-3">
                <form className="w-full xl:w-8/12 p-3" onSubmit={saveProduct}>
                    <h3 className="text-lg mb-3 text-black font-semibold">Create Product</h3>
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
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="image1" className="label">Image 1</label>
                            <input type="file" className="inputfile" name="image1" id="image1"
                                onChange={imageHandle} />
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="image2" className="label">Image 2</label>
                            <input type="file" className="inputfile" name="image2" id="image2"
                                onChange={imageHandle} />
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="image3" className="label">Image 3</label>
                            <input type="file" className="inputfile" name="image3" id="image3"
                                onChange={imageHandle} />
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
                    <ImagesPreview url={preview.image1} heading="image 1" />
                    <ImagesPreview url={preview.image2} heading="image 2" />
                    <ImagesPreview url={preview.image3} heading="image 3" />
                </div>

            </div>

        </Wrapper>
    );
};

export default CreateProduct;