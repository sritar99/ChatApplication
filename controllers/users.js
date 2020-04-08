'use strict';

module.exports = function(_){


    return{
        
        SetRouting: function(router){
            // console.log("request is pending");
            // router.get('/',this.indexPage);
            router.get('/',(req,res)=>{
                console.log(req.url);
                res.write('<html><body>Hai</body></html>');
            });
        },
        
        // indexPage: function(req,res){
        //     console.log(req.url);
        //     return res.send('index');
        // }
    }

}