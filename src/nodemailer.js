const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');

const app = express();
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your.email@gmail.com',
    pass: 'your_application_specific_password',
  }
});

const emailVerificationCodes = {};

app.post('/signup', (req, res) => {
  const { email, password, confirmPassword, username } = req.body;

  const verificationCode = randomstring.generate(4);

  const mailOptions = {
    from: 'your.email@gmail.com',
    to: email,
    subject: '이메일 인증 코드',
    text: `회원 가입을 완료하려면 다음 코드를 입력하세요: ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('이메일 보내기 실패: ' + error);
      res.status(500).send('이메일 보내기 실패');
    } else {
      console.log('이메일 보내기 성공: ' + info.response);

      emailVerificationCodes[email] = verificationCode;

      res.status(200).send('이메일을 확인하세요.');
    }
  });
});

app.post('/verify', (req, res) => {
  const { email, verificationCode } = req.body;

  if (emailVerificationCodes[email] === verificationCode) {

    res.status(200).send('인증 성공');
  } else {
    res.status(400).send('인증 코드가 일치하지 않습니다.');
  }
});

app.listen(3000, () => {
  console.log('서버가 3000 포트에서 실행 중입니다.');
});
