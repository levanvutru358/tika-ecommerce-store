import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './layout/default.layout';
import RegisterPage from './pages/auth/register';
import LoginPage from './pages/auth/login';
import ProductPage from './pages/product';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <DefaultLayout>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/products' element={<ProductPage />} />
        </Routes>
        </DefaultLayout>
    </React.Fragment>
  );
};

export default App;