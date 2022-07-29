import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

const PrivateRoute = ({children}) => { //children means Routing.js mai <PrivateRoute> ko jo pass kia ha wo children get kra ga

    const {adminToken} = useSelector((state) => state.authReducer); //We access adminToken which is State name in authReducer.js
    return adminToken ? children : <Navigate to="/auth/adminlogin"/>
};

export default PrivateRoute;


//Private Route is for not access dashboard without login,signup