'use strict';


module.exports = function(_,passport,User,validator){


    return{
        
        SetRouting: function(router){

            router.get('/',this.indexPage);
            router.get('/signup',this.getSignUp);
            


            router.post('/',[
                validator.check('email').not().isEmpty().isEmail().withMessage('Email is Required'),
                validator.check('password').not().isEmpty().withMessage('Password is Required'),
            ],this.postValidation, this.postLogin);
            
            router.post('/signup',[
                validator.check('username').not().isEmpty().withMessage('Username is Required'),
                validator.check('email').not().isEmpty().isEmail().withMessage('Email is Required'),
                validator.check('password').not().isEmpty().withMessage('Password is Required'),
            ], this.postValidation, this.postSignUp);

        },
        
        indexPage: function(req,res){
            const errors = req.flash('error');
            console.log(req.url);
            return res.render('index',{title:'Error in Login',messages:errors, hasErrors:errors.length>0});
        },

        postLogin: passport.authenticate('local.login',{
            successRedirect: '/group/ToAll',
            failureRedirect: '/',
            failureFlash:true
        }),

        getSignUp: function(req,res){
            const errors = req.flash('error');
            console.log(req.url);
            return res.render('signup',{title:'Error in Signing Up',messages:errors, hasErrors:errors.length>0});
        },

        postValidation: function(req,res,next){
                const err = validator.validationResult(req);
                const errors = err.array();
                    const messages = [];
                    errors.forEach((error) => {
                        messages.push(error.msg);
                    });

                    if(messages.length>0){
                        req.flash('error',messages);
                        if(req.url === '/signup'){
                            res.redirect('/signup');
                        }else if(req.url === '/'){
                            res.redirect('/');
                        }
                    }

                    return next();

        },

        postSignUp: passport.authenticate('local.signup',{
            successRedirect: '/group/ToAll',
            failureRedirect: '/signup',
            failureFlash:true
        }),
        
        
        

        


    }

}