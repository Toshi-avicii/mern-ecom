import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from '../screens/auth/AdminLogin';
import Products from '../screens/dashboard/Products';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Categories from '../screens/dashboard/Categories';
import CategoryForm from '../screens/dashboard/CategoryForm';

function Routing() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="auth">
                <Route path="admin-login" element={<PublicRoute><AdminLogin /></PublicRoute>} />
            </Route>
            <Route path='dashboard'>
              <Route path='products' element={<PrivateRoute><Products /></PrivateRoute>} />
              <Route path="categories" element={<PrivateRoute><Categories /></PrivateRoute>} />
              <Route path="create-categories" element={<PrivateRoute><CategoryForm /></PrivateRoute>} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Routing