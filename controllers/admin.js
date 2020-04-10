

const path = require('path');
const fs = require('fs');


module.exports = function(formidable){

    return{
        SetRouting: function(router){
            router.get('/dashboard',this.adminPage);

            router.post('/uploadFile',this.uploadFile);
        },


        adminPage: function(req,res){
            res.render('admin/dashboard');
        },

        uploadFile: function(req,res){
            const form = new formidable.IncomingForm();
            form.uploadDir = path.join(__dirname,'../public/uploads');


            form.on('file',(field,file)=>{
                fs.rename(file.path,path.join(form.uploadDir,file.name),(err)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log("File Named Successfully")
                    }
                })
            });


            form.on('error',(err)=>{
                console.log(err);
            });

            form.on('end',()=>{
                console.log("File Upload Successfully");
            });

            form.parse(req);
        }



    }
 }