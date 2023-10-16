import React, { useState } from 'react';
import { Link } from 'react-router-dom'
;
import {
  Container,
  Header,
  Label,
  Input,
  Button,
  ErrorMessage,
  SuccessMessage,
  LoginBack,
} from './styles/Signupstyled';

type User = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
};

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
    } else {
      alert('양식을 올바르게 작성해주세요.');
    }
  };

  const [email, setEmail] = useState('');

  const handleSignup = () => {
    window.location.href = '/verify'; 
  }

  return (
    <Container>
      <Header>
        우리 학교 알리미
        <br />회원가입
      </Header>
      {isSignUpSuccessful ? (
        <SuccessMessage>회원가입</SuccessMessage>
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
            <Label htmlFor="username">닉네임</Label>
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
            <LoginBack>
              <br />
              이미 계정이 있으신가요? <Link to="/">로그인</Link>
            </LoginBack>
          </div>
        </div>
      )}
    </Container>
  );
}

export default Signup;
