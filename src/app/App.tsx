import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { HelmetProvider } from 'react-helmet-async';
import { router } from './routes';

export default function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors />
    </HelmetProvider>
  );
}