import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

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

  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationCodeValid, setIsVerificationCodeValid] = useState(false);
  const [verificationRequested, setVerificationRequested] = useState(false);

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

  const sendVerificationCode = async () => {
    try {
      const response = await axios.post('http://localhost:3000/send-verification-email', { email: user.email });
      if (response.status === 200) {
        setVerificationRequested(true);
      }
    } catch (error) {
      console.error('이메일 전송 오류:', error);
    }
  };

  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setVerificationCode(code);
    setIsVerificationCodeValid(code === verificationCode);
  };

  const handleSignUp = async () => {
    if (isEmailValid && isPasswordValid && isPasswordsMatching && user.email && user.password) {
      if (isSignUpSuccessful) {
        alert('회원가입이 완료되었습니다.');
      } else if (verificationCode && isVerificationCodeValid) {
        try {
          const response = await axios.post('http://localhost:3000/verify-verification-code', {
            email: user.email,
            code: verificationCode,
          });

          if (response.status === 200) {
            setIsSignUpSuccessful(true);
          } else {
            alert('인증 코드가 올바르지 않습니다.');
          }
        } catch (error) {
          console.error('인증 코드 확인 오류:', error);
        }
      } else {
        alert('양식을 올바르게 작성해주세요.');
      }
    } else {
      alert('양식을 올바르게 작성해주세요.');
    }
  };

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
          {verificationRequested ? (
            <div>
              <Label htmlFor="verificationCode">인증 코드</Label>
              <Input
                type="text"
                name="verificationCode"
                id="verificationCode"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
              />
              {!isVerificationCodeValid && (
                <ErrorMessage>올바른 인증 코드를 입력하세요.</ErrorMessage>
              )}
            </div>
          ) : (
            <Button onClick={() => sendVerificationCode()}>인증번호 요청</Button>
          )}
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
