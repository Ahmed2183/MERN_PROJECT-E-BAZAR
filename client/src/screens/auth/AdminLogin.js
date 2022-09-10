import {useState,useEffect} from "react";
import { useAuthLoginMutation } from "../../store/services/authServices"; //Our Hook
import { setAdminToken } from "../../store/reducers/authReducer";
import {useDispatch} from"react-redux";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [state,setState] = useState({
    email:'',
    password:''
  })

  const dispatch = useDispatch(); //using for type ,,payload
  const navigate = useNavigate();  //using for naviagete pages

  const handleInputs = e => {
    setState({...state, [e.target.name]: e.target.value}); //...state means all states
  }
 
  const [login, response] = useAuthLoginMutation();
  // console.log("My Response",response);

  //Condtion apply on Errors
  //Agr console mai response hai tu check kro error agr error ha tu check kro data agr data ha tu check
  //kro errors agr errors hai then acess response?.error?.data?.errors else empty array
  const errors = response?.error?.data?.errors ? response?.error?.data?.errors : [];

 const adminLogin = e => {
   e.preventDefault(); //-->To stop refreshing page
   login(state);  //This state go into login>useAuthLoginMutation()>LoginData which is in authServices.js in endpoints and then backend API Call
 }
 

useEffect(()=>{
if(response.isSuccess && response?.data?.admin === true)  //If in console response mai isSuccess and admin true ha then store token in localStorage
{
  localStorage.setItem('admin-token',response?.data?.token);  //admin-token is or token key,our token is in response?.data?.token
  dispatch(setAdminToken(response?.data?.token)); //we send token to authReducer.js function in action.payload
  navigate('/dashboard/products');
}
},[response.isSuccess]) //Agr response.isSuccess variable change hojai tu useEffect ko dobara call kro

  return (
    {
      /* <div className="bg-navyblue h-screen sm:bg-white md:bg-black"> 
        sm: means if screen is 640px then white color show, md:  means if screen is 768px then black 
        color show, else navyblue color show , h-screen means height: 100vh */
    },
    (
      <div className="bg-navyblue h-screen flex justify-center items-center">
        <form 
        className="bg-black rounded-3xl p-20 w-10/12 sm:w-8/12 md:w-6/12 lg:w-3/12"
        onSubmit={adminLogin}
        >
          <h3 className="mb-4 text-white capitalize font-semibold text-lg">
            Admin Login
          </h3>

          {/* Calling Errors */}
          {errors.length > 0 && errors.map((error,key)=>(
            <div key={key}>
            <p 
            className="text-red-700 mb-3 rounded-full text-sm font-medium"
            >{error.msg}</p>
            </div>
          ))}

          <div className="mb-7 mt-3">
            <input
              type="email"
              name="email"  //In name="" and state name both must be same
              className="w-full bg-white p-2 rounded-full outline-none text-black"
              placeholder="Enter Email"
              onChange={handleInputs}
              value={state.email}  //value assign to e.target.value in handleInputs function
            />
          </div>
          <div className="mb-7">
            <input
              type="password"
              name="password"
              className="w-full bg-white p-2 rounded-full outline-none text-black"
              placeholder="Enter Password"
              onChange={handleInputs}
              value={state.password}
            />
          </div>
          <div className="mb-7">
              <input
              type="submit"
              // value="sign in &rarr;"  //&rarr means arrow sign its html symbol
              value={response.isLoading ? 'Loading...' : 'Sign In'}  //isLoading is in response check console
              className="bg-blue-600 w-full p-2 rounded-full text-white uppercase font-semibold cursor-pointer"
              />
          </div>
        </form>
      </div>
    )
  );
};

export default AdminLogin;
