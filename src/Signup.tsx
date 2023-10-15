import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type User = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
};

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
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
  margin-top: -8px;
  margin-bottom: 8px;
  display: block;
`;

const SucessMessage = styled.div`
  font-size: 20px;
`

const LoginBack = styled.div`
  text-align: center;
`

function Signup() {
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordsMatching, setIsPasswordsMatching] = useState(true);
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });

    if (name === 'email') {
      setIsEmailValid(validateEmail(value));
    }
    if (name === 'password') {
      setIsPasswordValid(validatePassword(value));
      if (user.confirmPassword) {
        setIsPasswordsMatching(user.confirmPassword === value);
      }
    }
    if (name === 'confirmPassword') {
      if (user.password) {
        setIsPasswordsMatching(user.password === value);
      }
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = () => {
    if (isEmailValid && isPasswordValid && isPasswordsMatching && user.email && user.password) {
      const userWithoutConfirmPassword = {
        email: user.email,
        password: user.password,
        username: user.username,
      };
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      storedUsers.push(userWithoutConfirmPassword);
      localStorage.setItem('users', JSON.stringify(storedUsers));

      setIsSignUpSuccessful(true);
    } else {
      alert('양식을 올바르게 작성해주세요.');
    }
  };

  return (
    <Container>
      <Header>우리 학교 알리미<br />회원가입</Header>
      {isSignUpSuccessful ? (
        <SucessMessage>회원가입</SucessMessage>
      ) : (
        <div>
          <div>
            <Label htmlFor="email">이메일</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleInputChange}
            />
            {!isEmailValid && (
              <ErrorMessage>유효한 이메일을 입력하세요.</ErrorMessage>
            )}
          </div>
          <div>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={handleInputChange}
            />
            {!isPasswordValid && (
              <ErrorMessage>최소 8자, 영문과 숫자를 포함하세요.</ErrorMessage>
            )}
          </div>
          <div>
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={user.confirmPassword}
              onChange={handleInputChange}
            />
            {!isPasswordsMatching && (
              <ErrorMessage>비밀번호와 비밀번호 확인이 일치하지 않습니다.</ErrorMessage>
            )}
          </div>
          <div>
            <Label htmlFor="username">닉네임<br /></Label>
            <Input
              type="text"
              name="username"
              id="username"
              value={user.username}
              onChange={handleInputChange}
            />
          </div>
          <Button onClick={handleSignUp}>회원가입</Button>
          <div>
      <LoginBack><br/>이미 계정이 있으신가요? <Link to="/">로그인</Link></LoginBack>
    </div>
        </div>
      )}
    </Container>
  );
}

export default Signup;
