const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const container = require('./container');





container.resolve(function(users){
    const app =SetupExpress();

    function SetupExpress(){
        const app = express();
        const server = http.createServer(app);

        server.listen(4000,function(){
            console.log("Server is Listening in the port 4000");
        });

        ConfigureExpress(app);

        const router = require('express-promise-router')();
        users.SetRouting(router);
        app.use(router);

        app.use(function(req, res){
            res.render('404');
        });
    }

    


    function ConfigureExpress(app){
        app.use(express.static('public'));
        app.set('view engine','ejs');
        app.use(bodyparser.json);
        app.use(bodyparser.urlencoded({extended:true}))
    }
});