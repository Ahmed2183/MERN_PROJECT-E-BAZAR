import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

const PublicRoute = ({children}) => { //children means Routing.js mai <PublicRoute> ko jo pass kia ha wo children get kra ga

    const {adminToken} = useSelector((state) => state.authReducer); //We access adminToken which is State name in authReducer.js
    return adminToken ? <Navigate to="/dashboard/products"/> : children
};

export default PublicRoute;


//Public Route is for not access login after login