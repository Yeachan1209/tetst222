const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');

const app = express();

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'yeow1842@gmail.com', // 발신자 이메일 주소
    pass: 'iefi cwqt qbtt spav', // 발신자 이메일 비밀번호(앱 비밀번호로)
  },
});

function generateRandomCode() {
  return randomstring.generate(4); 
}

app.post('/send-email', (req, res) => {
  const { email } = req.body;
  const verificationCode = generateRandomCode(); 

  const mailOptions = {
    from: 'yeow1842@gmail.com',
    to: email,
    subject: '이메일 인증 코드',
    text: `인증 코드: ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('이메일 보내기 실패: ' + error);
      res.status(500).json({ message: '이메일 발송 실패' });
    } else {
      console.log('이메일 보내기 성공: ' + info.response);
      res.status(200).json({ message: '이메일 발송 성공', verificationCode });
    }
  });
});

app.listen(3002, () => {
  console.log('Server 3002 Port running');
});
