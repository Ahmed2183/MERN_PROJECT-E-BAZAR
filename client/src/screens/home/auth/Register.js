import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Nav from "../../../components/home/Nav"
import Header from '../../../components/home/Header';
import { useUserRegisterMutation } from '../../../store/services/authServices';
import { setUserToken } from "../../../store/reducers/authReducer";
import { setSuccess } from "../../../store/reducers/globalReducer";
import { useForm } from '../../../hooks/Form';
import { showError } from '../../../utils/ShowErrors';

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [registerUser, response] = useUserRegisterMutation();
    // console.log(response);

    const [errors, setErrors] = useState([]);

    const { state, onChange } = useForm({ //state and onChange get from Form.js
        name: '',
        email: '',
        password: '',
    });

    const onSubmit = e => {
        e.preventDefault();
        // console.log(state);
        registerUser(state);
    }

    //Store token in Local Storage
    useEffect(() => {
        if (response.isSuccess) {
            localStorage.setItem('user-token', response?.data?.token);
            dispatch(setUserToken(response?.data?.token));
            dispatch(setSuccess(response?.data)); //For Show Success Message
            navigate('/user');
        }
    }, [response.isSuccess])


    //For Backend Errors
    useEffect(() => {

        if (response.isError) {
            setErrors(response?.error?.data?.errors);
        }

    }, [response?.error?.data])
    console.log(errors);

    return (
        <>
            <Nav />
            <div className='mt-[70px] pb-[80px]'>
                <Header>
                    Sign Up
                </Header>
                <div className="flex flex-wrap justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: "-100vw" }}
                        animate={{ opacity: 1, x: "0" }}
                        className='w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 p-6'>
                        <form onSubmit={onSubmit} className='bg-white rounded-lg -mt-12 border border-gray-200 p-10'>
                            <h1 className="heading mb-5">Sign Up</h1>
                            <div className="mb-4">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" name='name' id='name' placeholder='Name...' value={state.name} onChange={onChange}
                                    className={`form-input ${showError(errors, 'name') ? 'border-red-600 bg-rose-50' :
                                        'border-gray-300 bg-white'}`} />  {/*'name' is <input/> property name */}
                                {showError(errors, 'name') && <span className='error'>{showError(errors, 'name')}</span>} {/* errors is from ShowError.js */}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" name='email' id='email' placeholder='Email...' value={state.email} onChange={onChange}
                                    className={`form-input ${showError(errors, 'email') ? 'border-red-600 bg-rose-50' :
                                        'border-gray-300 bg-white'}`} />
                                {showError(errors, 'email') && <span className='error'>{showError(errors, 'email')}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" name='password' id='password' placeholder='Password...' value={state.password} onChange={onChange}
                                    className={`form-input ${showError(errors, 'password') ? 'border-red-600 bg-rose-50' :
                                        'border-gray-300 bg-white'}`} />
                                {showError(errors, 'password') && <span className='error'>{showError(errors, 'password')}</span>}
                            </div>
                            <div className="mb-4">
                                <input type='submit' value={`${response.isLoading ? 'Loading...' : 'sign up'}`}
                                    className='btn btn-black w-full' disabled={response.isLoading ? true : false} />
                            </div>
                            <div>
                                <p className='text-center'>Already have an account ?  </p>
                                <span className='capitalize font-medium text-base text-black'>
                                    <Link to="/login" className='block text-center'>Sign In</Link>
                                </span>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Register;