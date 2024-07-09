import { createBrowserRouter } from 'react-router-dom';
import { Homepage } from './components/HomePage';
import { Layout } from './components/Layout';
import { RetrieveBlocks } from './components/GetBlocks';
import { NotFound } from './components/Notfound';
import SendTransaction from './components/SendTransaction';
import { SignUp } from './components/SignUp';
import { LogIn } from './components/LogIn';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: '/transactions',
        element: <RetrieveBlocks />,
      },
      {
        path: '/sendtransaction',
        element: <SendTransaction />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/login',
        element: <LogIn />,
      },
    ],
  },
]);
