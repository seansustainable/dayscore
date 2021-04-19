const express = require('express');
const db = require('./models');
const passportConfig = require('./passport');
const passport = require('passport');
const cors = require('cors');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const actionRouter = require('./routes/action');
const postsRouter = require('./routes/posts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();
const app = express();
db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공')
    })
    .catch(console.error);
passportConfig();

app.use(morgan('dev')); // 프론트에서 어떤 요청이 왔는지 볼 수 있다.
app.use(cors({
    origin: true,
    credentials: true,
}));

// front에서 post로 보낸 데이터를 req.body에 넣어주는 역할을 한다. 다른 라우터들보다 상단에 위치해야 한다.
app.use(express.json()); // json 형식
app.use(express.urlencoded({ extended: true })); // form submit 형식

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());

// app.get('/api', (req, res) => {
//     res.send('hello api');
// })
//
// app.get('/api/posts', (req, res) => {
//     res.json([
//         { id: 1, content: 'hello'},
//         { id: 2, content: 'hello'},
//         { id: 3, content: 'hello'},
//     ])
// })
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/action', actionRouter);
app.use('/posts', postsRouter);

// 에러 처리 미들웨어는 내부적으로 존재
app.use((err, req, res, next) => {
    // 에러 페이지를 따로 띄워줄 수도 있고...
});

app.listen(3065, () => {
    console.log('서버 실행 중...');
});