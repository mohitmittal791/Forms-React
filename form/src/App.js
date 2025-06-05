import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FormPage from './components/FormPage';
import SuccessPage from './components/SuccessPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<FormPage />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
}

export default App;
