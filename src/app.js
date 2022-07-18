const express          = require('express');
const cors             = require('cors');
const env              = require('dotenv');
const methodOverride   = require('method-override');
const expressSanitizer = require('express-sanitizer');

const postRouter       = require('./routes/posts');
const userRouter       = require('./routes/users');
const mediaRouter      = require('./routes/media');
// // const commentRouter    = require('./routes/comments');
// // const repliesRouter    = require('./routes/comment-replies');

const app = express();
env.config();



require("./db/mongoose");



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSanitizer());
app.use(methodOverride('_method'));


app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/media', mediaRouter);
// // app.use('/api/posts/:id/comments', commentRouter);
// // app.use('/api/posts/:id/comments/:comment_id/replies', repliesRouter);


app.use((req, res) => {
    return res.status(404).json({ error: 'Not found' });
  });
  
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).json({ error: 'Internal error' });
  });



module.exports = app