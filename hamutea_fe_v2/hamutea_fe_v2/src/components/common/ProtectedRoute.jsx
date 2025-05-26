import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requiredRole = 'admin' }) {
  // Check for admin token first
  const adminToken = localStorage.getItem('adminToken');
  
  // Check for cashier token if admin token doesn't exist
  const cashierToken = localStorage.getItem('cashierToken');
  
  // If neither token exists, redirect to login
  if (!adminToken && !cashierToken) {
    return <Navigate to="/" replace />;
  }
  
  try {
    // Determine which user data to use based on available token
    const user = adminToken 
      ? JSON.parse(localStorage.getItem('adminUser') || '{}')
      : JSON.parse(localStorage.getItem('cashierUser') || '{}');
    
    // Check if user has the required role
    if (requiredRole === 'admin' && user.role !== 'admin') {
      // If admin access is required but user is not admin
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('cashierToken');
      localStorage.removeItem('cashierUser');
      return <Navigate to="/" replace />;
    }
    
    // If cashier access is required but user is neither admin nor cashier
    if (requiredRole === 'cashier' && user.role !== 'cashier' && user.role !== 'admin') {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('cashierToken');
      localStorage.removeItem('cashierUser');
      return <Navigate to="/" replace />;
    }
    
    // Redirect cashiers to their dashboard if they try to access admin routes
    if (requiredRole === 'admin' && user.role === 'cashier') {
      return <Navigate to="/cashier/orders" replace />;
    }
    
  } catch (error) {
    // If there's an error parsing the user data, redirect to login
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('cashierToken');
    localStorage.removeItem('cashierUser');
    return <Navigate to="/" replace />;
  }
  
  return children;
}

export default ProtectedRoute;