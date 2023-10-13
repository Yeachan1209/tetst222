import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = () => {
    // 로컬 스토리지에서 사용자 정보를 가져옵니다.
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // 입력한 이메일과 비밀번호와 일치하는 사용자를 찾습니다.
    const user = storedUsers.find((storedUser: any) => storedUser.email === email && storedUser.password === password);
    
    if (user) {
      // 사용자가 존재하면 로그인 성공
      setLoginSuccess(true);
    } else {
      // 사용자가 존재하지 않으면 로그인 실패
      setLoginSuccess(false);
    }
  };

  return (
    <div className="login-container">
      <h1>로그인</h1>
      {loginSuccess ? (
        <div className="success-message">로그인 성공! 환영합니다.</div>
      ) : (
        <div>
          <div>
            <label>이메일:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>비밀번호:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin}>로그인</button>
        </div>
      )}
    </div>
  );
}

export default Login;
