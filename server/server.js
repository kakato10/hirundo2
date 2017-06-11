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

app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", ["X-Requested-With", "Content-Type", "Access-Control-Allow-Methods"]);
    res.header("Access-Control-Allow-Methods", ["POST", "CREATE", "PUT", "DELETE"]);
    next();
});

app.use('/', postsRoutes);
app.use('/', usersRoutes);
app.use('/', commentsRoutes);

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
});
