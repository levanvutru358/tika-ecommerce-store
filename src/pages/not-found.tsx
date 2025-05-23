import { AlertCircle } from 'lucide-react';
import type React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <AlertCircle className="w-24 h-24 text-primary mx-auto mb-4" />
        <h1 className="text-7xl md:text-9xl font-bold text-primary uppercase tracking-tight">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-primary text-white font-semibold uppercase rounded hover:bg-primary/90 transition duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;