import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { PasswordPage } from './pages/PasswordPage';
import { CodePage } from './pages/CodePage';
import { SuccessPage } from './pages/SuccessPage';
import { NotFoundPage } from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" index element={<HomePage />} />
        <Route path="/react-auth-form-example" index element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/password" element={<PasswordPage />} />
        <Route path="/code" element={<CodePage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
