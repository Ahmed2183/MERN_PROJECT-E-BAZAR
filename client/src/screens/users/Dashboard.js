import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Nav from '../../components/home/Nav';
import Header from "../../components/home/Header";
import AccountList from '../../components/home/AccountList';
import toast, { Toaster } from 'react-hot-toast';
import { useVerifyPaymentQuery } from '../../store/services/paymentServices';
import { emptyCart } from '../../store/reducers/cartReducer';


const Dashboard = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [params] = useSearchParams();  //-->Get id from url

    const { user } = useSelector((state) => state.authReducer);

    const id = params.get('session_id'); //-->use single quotation marks otherwise it thought session_id is variable, get id in url after payment sucessfull
    // console.log(params.get('session_id'));

    /* skip is built-in key that gave by redux-toolkit iss mai agr skip true ha tu request send nhi hoga r agr skip false h then request send hoga */
    const { data, isSuccess } = useVerifyPaymentQuery(id, { skip: id ? false : true });
    // console.log(data); //--> We get undefined means koi bi request backend par send nhi hwa ha


    useEffect(() => {
        if (isSuccess) {
            localStorage.removeItem('cart');   // --> RemoveItem of carts from localStorage after payment successfull
            dispatch(emptyCart()); //-->Call emptyCart reducer
            toast.success(data.msg); // msg from backend PaymentController.js in paymentVerify controller
            navigate('/user'); // --> Navigate to user page bcz we remove payment id from url
        }
    }, [isSuccess])



    return (
        <>
            <Nav />
            <Toaster position="top-right" reverseOrder={false}/>
            <div className='mt-[70px]'>
                <Header>
                    My Account
                </Header>
                <div className="my-container mt-[40px]">
                    <div className="flex flex-wrap -mx-6">
                        <div className="w-full md:w-4/12 p-6">
                            <AccountList />
                        </div>
                        <div className="w-full md:w-8/12 p-6">
                            <h1 className="heading">Name</h1>
                            <span className="block mt-3 capitalize font-medium text-sm">
                                {user?.userdata?.name}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;