'use strict';
 module.exports = function(){

    return{
        SignUpValidation: (res,req,next)=>{
            req.checkBody('username','Username is Required').notEmpty();
            req.checkBody('username','Username must not be less than 5').isLength({min: 5});
            req.checkBody('email','Email is Required').notEmpty();
            req.checkBody('email','Email is invalid').isEmail();
            req.checkBody('password','Password is Required').notEmpty();
            req.checkBody('password','Password must not be less than 6').isLength({min: 6});


            req.getValidationResult()
                .then((result)=>{
                    const errors = result.array();
                    const messages = [];
                    errors.forEach((error) => {
                        messages.push(console.error.msg);
                    });


                    req.flash('error',messages);

                    res.redirect('/signup');
                })

                .catch((err)=>{
                    return next();
                })
            
        },



        LoginValidation: (res,req,next)=>{
            req.checkBody('email','Email is Required').notEmpty();
            req.checkBody('email','Email is invalid').isEmail();
            req.checkBody('password','Password is Required').notEmpty();
            req.checkBody('password','Password must not be less than 6').isLength({min: 6});


            req.getValidationResult()
                .then((result)=>{
                    const errors = result.array();
                    const messages = [];
                    errors.forEach((error) => {
                        messages.push(console.error.msg);
                    });


                    req.flash('error',messages);

                    res.redirect('/');
                })

                .catch((err)=>{
                    return next();
                })
            
        }


    }
 }




