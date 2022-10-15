import Wrapper from "./Wrapper";
import { useEffect } from "react";
import ScreenHeader from "../../components/ScreenHeader";
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearMessage } from '../../store/reducers/globalReducer';
import { useGetCategoriesQuery } from '../../store/services/categoryService';
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";

function Categories() {
  const { success } = useSelector(state => state.globalReducer);
  const dispatch = useDispatch();
  let { page } = useParams();
  const { data = [], isFetching } =  useGetCategoriesQuery(page ? page : 1);
  if(!page) {
    page = 1;
  }


  useEffect(() => {
    return () => {
      setTimeout(() => {
        dispatch(clearMessage());
      }, 2000);
    }
  }, [dispatch]);

  return (
   <Wrapper>
    <div className="p-4 text-justify bg-white rounded-md shadow-lg">
        <ScreenHeader>
            <Link to="/dashboard/create-categories" className="font-medium mb-4 btn">
                <i className="bi bi-plus mr-3 px-2 py-1 bg-primary text-xl text-white rounded"></i>
                <span>Add Categories</span>
            </Link>
        </ScreenHeader>
        {success && <p className="success-alert">{success}</p>}
        {
          !isFetching ? 
          data?.categories?.length > 0 &&
          <>
          <div>
            <p className="uppercase text-sm text-gray-600 font-semibold">Categories Table</p>
            <table className="w-full mt-6 rounded-md">
              <thead>
                <tr className="border-b border-b-gray-300">
                  <th className="text-xs text-gray-500 uppercase pb-2 text-left">Name</th>
                  <th className="text-xs text-gray-500 uppercase pb-2 text-center">Edit</th>
                  <th className="text-xs text-gray-500 uppercase pb-2 text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  data?.categories?.map(category => {
                    return (
                      <tr key={category._id}>
                        <td className="pt-2 font-bold text-gray-500">{category.name}</td>
                        <td className="pt-2 text-center">
                          <button className="p-3 rounded-md shadow-md bg-slate-50">
                            <i className="bi bi-pencil-fill bg-primary px-2 py-1 rounded-sm text-white"></i>
                            <span className="ml-2">Edit</span>
                          </button>
                        </td>
                        <td className="pt-2 text-center">
                          <button className="p-3 rounded-md shadow-md bg-slate-50">
                            <i className="bi bi-trash-fill bg-red-400 px-2 py-1 rounded-sm text-white"></i>
                            <span className="ml-2">Delete</span>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
          <Pagination page={parseInt(page)} perPage={data.perPage} count={data.count} />
          </> :
          <Spinner /> 
        }
      </div>
   </Wrapper>
  )
}

export default Categories;