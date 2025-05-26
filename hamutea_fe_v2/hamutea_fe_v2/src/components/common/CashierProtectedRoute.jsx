import { Navigate } from 'react-router-dom';

function CashierProtectedRoute({ children }) {
  const token = localStorage.getItem('cashierToken');
  
  if (!token) {
    // Redirect to login page if no token
    return <Navigate to="/" replace />;
  }
  
  try {
    // Check if user is cashier or admin (admins can access cashier portal)
    const user = JSON.parse(localStorage.getItem('cashierUser') || '{}');
    
    if (user.role !== 'cashier' && user.role !== 'admin') {
      // Redirect to login page if user is not cashier or admin
      localStorage.removeItem('cashierToken');
      localStorage.removeItem('cashierUser');
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    // If there's an error parsing the user data, redirect to login
    localStorage.removeItem('cashierToken');
    localStorage.removeItem('cashierUser');
    return <Navigate to="/" replace />;
  }
  
  return children;
}

export default CashierProtectedRoute;