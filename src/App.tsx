import React, { useState } from 'react';
import "./App.css"

type User = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
};

function App() {
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
    <div className="signup-container">
      <h1>우리 학교 알리미<br/><br/>회원가입</h1>
      {isSignUpSuccessful ? (
        <div className="success-message">회원가입이 성공적으로 완료되었습니다.</div>
      ) : (
        <div>
          <div>
            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
            {!isEmailValid && (
              <span className="error-message">유효한 이메일을 입력하세요.</span>
            )}
          </div>
          <div>
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
            />
            {!isPasswordValid && (
              <span className="error-message">최소 8자, 영문과 숫자를 포함하세요.</span>
            )}
          </div>
          <div>
            <label>비밀번호 확인</label>
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleInputChange}
            />
            {!isPasswordsMatching && (
              <span className="error-message">비밀번호와 비밀번호 확인이 일치하지 않습니다.</span>
            )}
          </div>
          <div>
            <label>닉네임<br/></label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleSignUp}>회원가입</button>
        </div>
      )}
    </div>
  );
}

export default App;
