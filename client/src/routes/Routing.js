import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AdminLogin from '../screens/auth/AdminLogin';
import Product from '../screens/dashboard/Product';
import Categories from '../screens/dashboard/Categories';
import CreateCategory from '../screens/dashboard/CreateCategory';
import UpdateCategory from '../screens/dashboard/UpdateCategory';
import CreateProduct from '../screens/dashboard/CreateProduct';
import EditProduct from '../screens/dashboard/EditProduct';
import Home from '../screens/home/Home';
import Login from '../screens/home/auth/Login';
import Register from '../screens/home/auth/Register';
import Dashboard from '../screens/users/Dashboard';
import UserRoute from './UserRoute';
import UserAuthRoute from './UserAuthRoute';
import CategoryProduct from '../screens/home/CategoryProduct';
import UserProduct from '../screens/home/Product';
import SearchProduct from '../screens/home/SearchProduct';
import Cart from '../screens/home/Cart';
import Orders from '../screens/dashboard/Orders';
import OrderDetails from '../screens/dashboard/OrderDetails';
import UserOrders from '../screens/users/UserOrders';
import UserOrderDetails from '../screens/users/UserOrderDetails';

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* User Routes */}
                <Route path='/' element={<Home />} />
                <Route path='categoryproducts/:name' element={<CategoryProduct />} />
                <Route path='categoryproducts/:name/:page' element={<CategoryProduct />} />
                <Route path='searchproducts/:keyword/:page' element={<SearchProduct />} />
                <Route path='product/:name' element={<UserProduct />} />
                <Route path='cart' element={<Cart />} />

                <Route element={<UserAuthRoute />}>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Route>
                {/* In UserRoute.js Outlet means jo bi <Outlet/> route mai children ha usaa load kro, Here <UserRoute/> is our Outlet Route */}
                <Route element={<UserRoute />}>
                    <Route path='/user' element={<Dashboard />} />
                    <Route path='/orders' element={<UserOrders />} />
                    <Route path='/orders/:page' element={<UserOrders />} />
                    <Route path='/user-order-details/:id' element={<UserOrderDetails />} />
                </Route>

                {/* Admin Routes */}
                <Route path='auth'>  {/*The URL is Like: http://localhost:3000/auth/adminlogin */}
                    <Route path='adminlogin' element={<PublicRoute><AdminLogin /></PublicRoute>} />
                </Route>
                <Route path='dashboard'>  {/*The URL is Like: http://localhost:3000/dashboard/products */}
                    {/*In PrivateRoute we pass <Product/> Route, In PrivateRoute.js children get this <Product/> Route */}
                    {/*The URL is Like: http://localhost:3000/dashboard/products */}
                    <Route path='products' element={<PrivateRoute><Product /></PrivateRoute>} />
                    <Route path='products/:page' element={<PrivateRoute><Product /></PrivateRoute>} />
                    {/*The URL is Like: http://localhost:3000/dashboard/editproduct/id */}
                    <Route path='editproduct/:id' element={<PrivateRoute><EditProduct /></PrivateRoute>} />
                    {/*The URL is Like: http://localhost:3000/dashboard/categories */}
                    <Route path='categories' element={<PrivateRoute><Categories /></PrivateRoute>} />
                    {/*The URL is Like: http://localhost:3000/dashboard/categories/pagenumber */}
                    <Route path='categories/:page' element={<PrivateRoute><Categories /></PrivateRoute>} />
                    {/*The URL is Like: http://localhost:3000/dashboard/createcategory */}
                    <Route path='createcategory' element={<PrivateRoute><CreateCategory /></PrivateRoute>} />
                    {/*http://localhost:3000/dashboard/categories/id */}
                    <Route path='updatecategory/:id' element={<PrivateRoute><UpdateCategory /></PrivateRoute>} />
                    {/*The URL is Like: http://localhost:3000/dashboard/createproduct */}
                    <Route path='createproduct' element={<PrivateRoute><CreateProduct /></PrivateRoute>} />
                    {/*The URL is Like: http://localhost:3000/dashboard/orders */}
                    <Route path='orders' element={<PrivateRoute><Orders /></PrivateRoute>} />
                    <Route path='orders/:page' element={<PrivateRoute><Orders /></PrivateRoute>} />
                    <Route path='order-details/:id' element={<PrivateRoute><OrderDetails /></PrivateRoute>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;