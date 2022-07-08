// const express          = require('express');
// const cors             = require('cors');
// const chalk            = require('chalk');
// const env              = require('dotenv');
// const methodOverride   = require('method-override');
// const expressSanitizer = require('express-sanitizer');

// /* Relative imports */
// // const postRouter       = require('./routes/posts');
// // const userRouter       = require('./routes/users');
// // const mediaRouter      = require('./routes/media');
// // const commentRouter    = require('./routes/comments');
// // const repliesRouter    = require('./routes/comment-replies');

// /* setup express */
// const app = express();
// env.config();

// /* global variables */
// const { log } = console;
// const PORT = process.env.PORT;
// const NODE_ENV = process.env.NODE_ENV;
// const DATABASE_URI = process.env.DATABASE_URI;



// /* setup middlewares */
// require('./middlewares/auth');


// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(expressSanitizer());
// app.use(methodOverride('_method'));

// /** Routes */
// // app.use('/api/users', userRouter);
// // app.use('/api/posts', postRouter);
// // app.use('/api/media', mediaRouter);
// // app.use('/api/posts/:id/comments', commentRouter);
// // app.use('/api/posts/:id/comments/:comment_id/replies', repliesRouter);



// // module.exports = app.listen(PORT, () => {
//   // log(`server running on port ${chalk.bgWhite.magenta(PORT)} in ${NODE_ENV}`)
