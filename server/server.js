//express
const express = require('express');
const app = express();
const port = 3000;

// body-parser registration
const bodyParser = require('body-parser');

app.use(bodyParser.json({ type: 'application/json' }));

// models initialization
const modelsInit = require('./models_init.js');

modelsInit(app);

const postsRoutes = require('./routes/posts.js');
const usersRoutes = require('./routes/users.js');
const commentsRoutes = require('./routes/comments.js');
app.use('/', postsRoutes);
app.use('/', usersRoutes);
app.use('/', commentsRoutes);

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
});
