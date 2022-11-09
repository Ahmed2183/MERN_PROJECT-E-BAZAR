import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'; //useSelector is for access reducers and state in reducers
import Wrapper from "./Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import { clearMessage, setSuccess } from "../../store/reducers/globalReducer";
// import { clearMessage } from "../../store/reducers/globalReducer";
import { useGetCategoryQuery, useDeleteCategoryMutation } from "../../store/services/categoryServices";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import swal from 'sweetalert'; //For alert box

const Categories = () => {

  let { page } = useParams(); //page is from Routing.js: 'categories/:page'
  // console.log("Your Page Number",page);

  if (!page)  //Means if page number ha then page number use kro else page number 1 hoga
  {
    page = 1;
  }

  //For Pagination
  //data = [] mai categories add hogi agr jis page pr categories nhi hogi tu data mai empty array hoga
  //isFetching is true hoga
  const { data = [], isFetching } = useGetCategoryQuery(page);
  // console.log(data,isFetching);

  //For Delete Category
  const [removeCategory, response] = useDeleteCategoryMutation(); //-->removeCategory use here
  // console.log(response);

  const deleteCategory = id => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Your Category has been deleted!", {
            icon: "success",
          });
          removeCategory(id); //-->its function
        } else {
          swal("Your category is safe!");
        }
      });

  }

  const dispatch = useDispatch();

  useEffect(() => { //For show error r success msgs
    if (response.isSuccess) {
      dispatch(setSuccess(response?.data?.msg));
    }
  }, [response?.data?.msg])


  //For Show Error
  // const { success } = useSelector(state => state.globalReducer); //globalReducer access from index.js and success is state name in globalReducer.js
  // console.log(success);


  // useEffect(() => {
  //   dispatch(setSuccess(success));
  //   return () => {
  //     dispatch(clearMessage());
  //   };
  // }, [])


  return (
    <>
      <Wrapper>

        <ScreenHeader>
          <Link to="/dashboard/createcategory" className="btn-navyblue">
            Add Categories
            <i className="bi bi-bookmark-plus mr-2 inline-block text-lg px-1 py-1 cursor-pointer transition-all"></i>
          </Link>
        </ScreenHeader>
        {/* {success && 
      <div className="alert-msg">{success}</div>}  Call success For Message  */}
        {!isFetching ? data?.categories?.length > 0 && // For Fetch Category Data
          <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-navyblue dark:bg-gray-900 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
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
                  {data?.categories?.map(category => (
                    <tr key={category._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700
               transition duration-300 ease-in-out hover:bg-gray-200">
                      <td className="px-6 py-4">{category.name}</td>
                      <td className="px-6 py-4">
                        <Link to={`/dashboard/updatecategory/${category._id}`} className="btn-black">
                          Edit</Link></td>
                      <td className="px-6 py-4"><button
                        className="btn-red"
                        onClick={() => deleteCategory(category._id)}
                      >
                        Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Send data to Pagination.js as props */}
            <Pagination
              page={parseInt(page)} perPage={data.perPage}
              count={data.count} path="dashboard/categories" />
          </>
          : <Spinner />}
      </Wrapper>
    </>
  );
};

export default Categories;
