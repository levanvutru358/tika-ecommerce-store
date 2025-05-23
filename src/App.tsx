import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './layout/default.layout';
import RegisterPage from './pages/auth/register';
import LoginPage from './pages/auth/login';
import ProductPage from './pages/product';
import { CartProvider } from './contexts/CartContext';
import NotFound from './pages/not-found';
import HomePage from './pages/home';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <CartProvider>
        <DefaultLayout>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/products' element={<ProductPage />} />
            <Route path='*' element={<NotFound  />} />
          </Routes>
          </DefaultLayout>
      </CartProvider>
    </React.Fragment>
  );
};

export default App;