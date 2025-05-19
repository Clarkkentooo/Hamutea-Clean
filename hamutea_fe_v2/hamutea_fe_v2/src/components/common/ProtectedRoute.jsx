import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('adminToken');
  
  if (!token) {
    // Redirect to login page if no token
    return <Navigate to="/" replace />;
  }
  
  try {
    // Check if user is admin
    const user = JSON.parse(localStorage.getItem('adminUser') || '{}');
    
    if (user.role !== 'admin') {
      // Redirect to menu page if user is not admin
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      return <Navigate to="/menu" replace />;
    }
  } catch (error) {
    // If there's an error parsing the user data, redirect to login
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    return <Navigate to="/" replace />;
  }
  
  return children;
}

export default ProtectedRoute;