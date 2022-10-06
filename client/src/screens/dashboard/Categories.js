import Wrapper from "./Wrapper";
import { useEffect } from "react";
import ScreenHeader from "../../components/ScreenHeader";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearMessage } from '../../store/reducers/globalReducer';

function Categories() {
  const { success } = useSelector(state => state.globalReducer);
  const dispatch = useDispatch();

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
        <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
   </Wrapper>
  )
}

export default Categories;