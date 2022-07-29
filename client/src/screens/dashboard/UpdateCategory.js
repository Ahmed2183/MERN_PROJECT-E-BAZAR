import React from "react";
import Wrapper from "./Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useState,useEffect} from "react";
import {useDispatch} from"react-redux";
import { useFetchCategoryQuery,useUpdateCategoryMutation } from "../../store/services/categoryServices";
import {setSuccess} from "../../store/reducers/globalReducer";
import Spinner from "../../components/Spinner";
import swal from 'sweetalert';

const UpdateCategory = () => {

  const [state,setState] = useState('');

  //For fetch category name in update input box
  const {id} = useParams(); //For get id from url,params is for get anything from url
  const {data, isFetching} = useFetchCategoryQuery(id);
  // console.log('Category Data: ',data);
  useEffect(() => {
data?.categories && setState(data?.categories?.name);
  },[data?.categories]);

  //For Add Updated Category
  const [saveCategory,response] = useUpdateCategoryMutation();
  // console.log(response);
  
  //For backend errors
  const errors = response?.error?.data?.errors ? response?.error?.data?.errors : [];

  const updateSubmit = e => {
    e.preventDefault(); 
    saveCategory({name:state, id}); //saveCategory is function ,Assign name to state
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    if(response?.isSuccess)  //response.isSuccess is in console
    { //For errors or success msgs
      dispatch(setSuccess(response?.data?.msg)) //-->send to globalReducer in function setSuccess action.payload
      // alert("Catergory Updated Successfully!")
      swal({ //For alert box
        title: "Category Updated Successfully!",
        icon: "success",
      });
      navigate('/dashboard/categories');
    }
    },[response.isSuccess])


  return (
    <>
       <Wrapper> 
       
       <ScreenHeader>
       <Link to="/dashboard/categories" className="btn-navyblue">
       <i className="bi bi-arrow-left-circle mr-1 inline-block text-lg px-1 py-1 cursor-pointer transition-all"></i>
           Categories List
           </Link>
       </ScreenHeader>

       {!isFetching ? 
       <form className="w-full" onSubmit={updateSubmit}>
           <h3 className="text-lg mb-3 text-black font-semibold">Update Category</h3>
            {/* Calling Errors */}
          {errors.length > 0 && errors.map((error,key)=>(
            <div key={key}>
            <p 
            className="text-red-700 mb-3 rounded-full text-sm font-medium"
            >{error.msg}</p>
            </div>
          ))}
           <div className="mb-3">
            <input type="text" name="" className="form" placeholder="Category Name" 
            value={state} onChange={(e) => setState(e.target.value)}
            />
           </div>

           <div className="mb-3">
               <input type="submit" value='Update Category' className="btn-red"/>
           </div>

       </form> : <Spinner/>}
       
      </Wrapper>
    </>
  );
};

export default UpdateCategory;
