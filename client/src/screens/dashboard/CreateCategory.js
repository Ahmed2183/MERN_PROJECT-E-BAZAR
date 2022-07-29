import React from "react";
import Wrapper from "./Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import { Link, useNavigate } from "react-router-dom";
import {useState,useEffect} from "react";
import {useDispatch} from"react-redux";
import { useCreateCategoryMutation } from "../../store/services/categoryServices";
import {setSuccess} from "../../store/reducers/globalReducer";
import swal from 'sweetalert'; //For alert box

const CreateCategory = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state,setState] = useState('');

  const [saveCategory,response] = useCreateCategoryMutation(); //-->saveCategory use here
  // console.log(response);

  const errors = response?.error?.data?.errors ? response?.error?.data?.errors : [];
  
  const submitCategory = e => {
    e.preventDefault(); 
    saveCategory({name:state}); ////saveCategory is function,Assign name to state
  }

  useEffect(()=>{
    if(response?.isSuccess)  //response?.isSuccess is in console
    {
       //setSuccess for check backend errors
      dispatch(setSuccess(response?.data?.msg)) //-->send to globalReducer in function setSuccess action.payload
      // alert("Catergory Added Successfully!")
      swal({  //For alert box
        title: "Catergory Added Successfully!",
        icon: "success",
      });
      navigate('/dashboard/categories');
    }
    },[response?.isSuccess])


  return (
    <>
       <Wrapper> 
       
       <ScreenHeader>
       <Link to="/dashboard/categories" className="btn-navyblue">
       <i className="bi bi-arrow-left-circle mr-1 inline-block text-lg px-1 py-1 cursor-pointer transition-all"></i>
           Categories List
           </Link>
       </ScreenHeader>

       <form className="w-full" onSubmit={submitCategory}>
           <h3 className="text-lg mb-3 text-black font-semibold">Create Category</h3>
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
               <input type="submit" value={response.isLoading ? 'Loading...' : 'Save Category'} className="btn-red" />
           </div>

       </form>
       
      </Wrapper>
    </>
  );
};

export default CreateCategory;
