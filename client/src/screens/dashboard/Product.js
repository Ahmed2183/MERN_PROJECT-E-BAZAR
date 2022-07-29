import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../store/reducers/globalReducer";
import Wrapper from "./Wrapper";
import swal from 'sweetalert'; //For alert box
import ScreenHeader from "../../components/ScreenHeader";
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery, useDeleteProductMutation } from "../../store/services/productServices";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";

const Product = () => {
  let { page } = useParams(); //page is from Routing.js: 'products/:page'

  if (!page) {
    //Means if page number ha then page number use kro else page number 1 hoga
    page = 1;
  }

  const { data = [], isFetching } = useGetProductsQuery(page);
  // console.log(data);
  const [removeProduct, response] = useDeleteProductMutation();

  // For Showing toast success message on Product Screen
  // const {success} = useSelector(state => state.globalReducer);
  // const dispatch = useDispatch();

  // useEffect(()=>{
  //   if(success)
  //   {
  //     toast.success(success);
  //   }
  //   return () => {
  //     dispatch(clearMessage());
  //   }
  // },[])


  const deleteProduct = id => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Your Product has been deleted!", {
          icon: "success",
        });
        removeProduct(id); //-->its function
      } else {
        swal("Your product is safe!");
      }
    });
  
  }

  return (
    <>
      <Wrapper>
        {" "}
        {/*//Send to Product.js, In inside Wrapper we send data as a props */}
        <ScreenHeader>
          <Link to="/dashboard/createproduct" className="btn-navyblue">
            <i className="bi bi-plus-square mr-2 inline-block text-lg px-1 py-1 cursor-pointer transition-all"></i>
            Create Product
          </Link>
          <Toaster position="top-right" />
        </ScreenHeader>
        {!isFetching ? (
          data?.products?.length > 0 ? ( // For Fetch Products Data
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-navyblue dark:bg-gray-900 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Stock
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Edit
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.products?.map((product) => (
                    <tr
                      key={product._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700
               transition duration-300 ease-in-out hover:bg-gray-200"
                    >
                      <td className="px-6 py-4">{product.title}</td>
                      <td className="px-6 py-4">${product.price}.00</td>
                      <td className="px-6 py-4">{product.stock}</td>
                      <td className="px-6 py-4">
                        <img
                          src={`/images/${product.image1}`}
                          alt="image name" // only show image1
                          className="w-20 h-20 rounded-md object-cover"
                        />{" "}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/dashboard/editproduct/${product._id}`}
                          className="btn-black"
                        >
                          Edit
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="btn-red"
                         onClick={ () => deleteProduct(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                page={parseInt(page)}
                perPage={data.perPage}
                count={data.count}
                path="dashboard/products"
              />
            </div>
          ) : (
            "No Products!"
          )
        ) : (
          <Spinner />
        )}
      </Wrapper>
    </>
  );
};

export default Product;
