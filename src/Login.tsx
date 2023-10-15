import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate로 수정
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 0 auto;
  width: 100%;
`;

const Header = styled.h1`
  color: #0074e4;
  text-align: center;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
  color: #333;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #0074e4;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border 0.3s;
  &:focus {
    border-color: #0074e4;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #0074e4;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  outline: none;
  text-align: center;
  display: block;
  margin: 0 auto;

  &:hover {
    background-color: #0056b3;
  }
`;

const SignupPage = styled.div`
  text-align: center;
  margin-top: 16px;
`;

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); 

  const handleLogin = () => {
    if (email && password) {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const user = storedUsers.find((u: { email: string; password: string; }) => u.email === email && u.password === password);
      
      if (user) {
        navigate('/Signup');
      } else {
        alert('이메일 또는 비밀번호가 잘못되었습니다.');
      }
    } else {
      alert('이메일과 비밀번호를 입력해주세요.');
    }
  };

  return (
    <Container>
      <Header>우리 학교 알리미<br />로그인</Header>
      <div>
        <div>
          <Label>이메일</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label>비밀번호</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button onClick={handleLogin}>로그인</Button>
      </div>
      <SignupPage>아직 계정이 없으신가요? <Link to="/Signup">회원가입</Link></SignupPage>
    </Container>
  );
}

export default LoginPage;
