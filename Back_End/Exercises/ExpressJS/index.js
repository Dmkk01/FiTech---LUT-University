const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./members');

const app = express();


// Init middleware
// app.use(logger);

// HandleBars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Homepage router
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// });

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Member api routes
app.use('/api/members', require('./routes/api/member'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));