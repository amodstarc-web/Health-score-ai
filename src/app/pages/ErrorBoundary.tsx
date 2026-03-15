import { useRouteError, isRouteErrorResponse, Link } from 'react-router';
import { Home, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function ErrorBoundary() {
  const error = useRouteError();
  
  let errorMessage: string;
  let errorStatus: number | undefined;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'An unexpected error occurred';
  }

  // If it's a 404, show a friendly not found page
  if (errorStatus === 404) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-9xl mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-3xl text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // For other errors, show a generic error page
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-10 w-10 text-red-600" />
        </div>
        <h1 className="text-4xl text-gray-900 mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-600 mb-2">
          We encountered an error while processing your request.
        </p>
        {errorMessage && (
          <p className="text-sm text-gray-500 mb-8 font-mono bg-gray-100 p-4 rounded-lg">
            {errorMessage}
          </p>
        )}
        <div className="flex gap-4 justify-center">
          <Link to="/">
            <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="border-gray-300"
          >
            Reload Page
          </Button>
        </div>
      </div>
    </div>
  );
}
