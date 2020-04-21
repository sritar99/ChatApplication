const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const cookieParser = require('cookie-parser');
// const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const socketIO = require('socket.io');
var $ = require('jquery');
const path = require('path');
const {Users} = require('./helpers/UsersClass')
const {Global} = require('./helpers/Global')


const container = require('./container');



container.resolve(function(users, _, admin,home,groupChannel,privatechat){

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/chatapplication',{useNewUrlParser:true});

    const app =SetupExpress();

    function SetupExpress(){
        const app = express();
        const server = http.createServer(app);
        const io = socketIO(server);

        server.listen(4000,function(){
            console.log("Server is Listening in the port 4000");
        });

        ConfigureExpress(app, io);
        require('./socket/groupchat')(io,Users);
        require('./socket/friend')(io);
        require('./socket/globalroom')(io,Global,_);
        require('./socket/privatemsg')(io);

        const router = require('express-promise-router')();
        users.SetRouting(router);
        admin.SetRouting(router);
        home.SetRouting(router);
        groupChannel.SetRouting(router);
        privatechat.SetRouting(router);

        app.use(router);

    }

    


    function ConfigureExpress(app, io){
        

        require('./passport/passport-local');
        app.use(express.static('public'));
        app.use(cookieParser());
        app.set('view engine','ejs');
        app.set('views', path.join(__dirname, 'views'));
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({extended:true}));
        
        // app.use(validator());
        app.use(session({
            secret: "thisisasecretkey",
            resave: true,
            saveInitialized: true,
            store: new MongoStore({mongooseConnection: mongoose.connection})
        }))

        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());

        app.locals._ = _;

        
    }
});