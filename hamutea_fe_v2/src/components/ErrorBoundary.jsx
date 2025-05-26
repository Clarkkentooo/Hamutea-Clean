import { useRouteError, Link } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-hamutea-red mb-4">
          {error.status === 404 ? 'Page Not Found' : 'Something went wrong'}
        </h1>
        
        <p className="text-gray-600 mb-6">
          {error.status === 404
            ? "The page you're looking for doesn't exist or has been moved."
            : "We're sorry, an unexpected error has occurred."}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-2 bg-hamutea-red text-white rounded-full hover:bg-red-700 transition-colors"
          >
            Go to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 border border-hamutea-red text-hamutea-red rounded-full hover:bg-red-50 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;