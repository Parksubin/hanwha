var express = require('express');
var router = express.Router();
const { v4: uuidV4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { auth } = require('./authMiddleware');
const SECRET_KEY = 'HANWHA';
router.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

router.get('/:room', (req, res) => {
  res.render('index', { roomId: req.params.room });
});

// POST /login 요청 body에 id와 password를 함께 실어서 요청으로 가정 (사실 id와 password는 암호화 되어있음)
router.post('/login', (req, res, next) => {

  //받은 요청의 id와 password로 DB에서 프로필사진, 닉네임 등 로그인 정보를 가져온다.
  const survey ='survey'

  //jwt.sign(payload, secretOrPrivateKey, [options, callback])
  token = jwt.sign({
    type: 'JWT',
    survey: survey
  }, SECRET_KEY, {
    expiresIn: '10m', // 만료시간 15분
    issuer: 'hanwha_HiCPS_Admin',
  });

  //response
  return res.status(200).json({
    code: 200,
    message: '토큰이 발급되었습니다.',
    token: token
  });
});


router.get('/test', (req, res) => {
  res.render('index2');
});

router.get('/payload', auth(dd), (req, res) => {
  console.log("req.param" , req.params)
  return res.status(200).json({
    code: 200,
    message: '토큰은 정상입니다.',
    data: {
      email: ''
    }
  });
});
module.exports = router;
