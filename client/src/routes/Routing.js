import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from '../screens/auth/AdminLogin';

function Routing() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="auth">
                <Route path="admin-login" element={<AdminLogin />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Routing