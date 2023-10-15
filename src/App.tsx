import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> {/* 기본은 로그인 페이지 */}
        <Route path="/signup" element={<Signup />} /> {/* 회원가입 페이지 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
