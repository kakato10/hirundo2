//express
const express = require('express');
const app = express();
const port = 3000;

const passport = require('passport');
// body-parser registration
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

app.use(bodyParser.json({ type: 'application/json' }));

// models initialization
const modelsInit = require('./models_init.js');

modelsInit(app);

const postsRoutes = require('./routes/posts.js');
const usersRoutes = require('./routes/users.js');
const commentsRoutes = require('./routes/comments.js');
const authRoutes = require('./routes/authentication');
const settingsRoutes = require('./routes/settings');
const statsRoutes = require('./routes/stats');

app.use(cookieSession({
    keys: ['secret1', 'secret2'],
    maxAge: 24 * 60 * 60 * 1000 // 1 day
}));
app.use(passport.initialize());
app.use(passport.session());

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
app.use('/', authRoutes);
app.use('/', settingsRoutes);
app.use('/', statsRoutes);

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
});
