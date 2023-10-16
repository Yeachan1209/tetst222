import React, { useState } from 'react';

function Verify() {
  const [email, setEmail] = useState('');

  const handleSignup = () => {
    window.location.href = '/verify';
  }

  return (
    <div>
      <h2>회원가입</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSignup}>회원가입</button>
    </div>
  );
}

export default Verify;
