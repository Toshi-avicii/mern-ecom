import Wrapper from "./Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCreateCategoryMutation } from '../../store/services/categoryService';
import { useDispatch } from 'react-redux';
import { setSuccess } from '../../store/reducers/globalReducer';

function CategoryForm() {
    const [category, setCategory] = useState('');
    // this hook returns a function and the response came from the backend
    const [saveCategory, response] = useCreateCategoryMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const errors = response?.error?.data?.errors || [];

    const changeInput = (e) => {
        setCategory(e.target.value);
    }

    const submitCategory = (e) => {
        e.preventDefault();
        saveCategory({ name: category });
    }

    useEffect(() => {
        if(response?.isSuccess) {
            dispatch(setSuccess(response?.data?.msg));
            navigate('/dashboard/categories');
        }
    }, [response, navigate, dispatch])

  return (
   <Wrapper>
    <div className="p-4 text-justify bg-white rounded-md shadow-lg">
        <ScreenHeader>
            <Link to="/dashboard/categories" className="font-medium mb-4 btn">
                <i className="bi bi-arrow-left mr-3 px-2 py-1 bg-primary text-xl text-white rounded"></i>
                <span>Categories List</span>
            </Link>
        </ScreenHeader>
        <form className="md:w-8/12 w-full" onSubmit={submitCategory}>
            <h3 className="text-lg capitalize mb-3">Create Category</h3>
            { errors.length > 0 && errors.map((error, index) => {
                return <p className="error-alert" key={index}>{error.msg}</p>
            })}

            <div className="mb-3">
                <input 
                    type="text"
                    name=""
                    className="form-control"
                    placeholder="Category Name..."
                    value={category}
                    onChange={changeInput}
                />
            </div>

            <div className="mb-3">
                <input 
                    type="submit"
                    name=""
                    className="btn-indigo"
                    value={response.isLoading ? 'Loading...' : "Create Category"}
                />
            </div>
        </form>
      </div>
   </Wrapper>
  )
}

export default CategoryForm;