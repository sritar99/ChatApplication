
module.exports = function(async, Group, _,formidable,aws){

    return{
        SetRouting: function(router){
            router.get('/home',this.homePage);

            router.post('/uploadFile',aws.Upload.any(),this.uploadFile);
            router.post('/home',this.adminPostPage,this.homePage);
        },

        homePage: function(req,res){
            console.log(req.url);
            async.parallel([
                function(callback){
                    Group.find({},(err,result)=>{
                        callback(err,result);
                    })
                }
            ],(err,results)=>{
                const res1 = results[0];

                const dataChunk  = [];
                const chunkSize = 3;
                for (let i = 0; i < res1.length; i += chunkSize){
                    dataChunk.push(res1.slice(i, i+chunkSize));
                }

                // console.log(res1);
                // console.log(dataChunk);
                res.render('home',{title: "Home", chunk: dataChunk});
            })
            
        },


        adminPostPage: function(req,res){

            const newGroup = new Group();
            newGroup.name = req.body.group;
            newGroup.country = req.body.country;
            newGroup.image = req.body.upload;

            newGroup.save((err)=>{
                res.render('home');
            });
        },




        uploadFile: function(req,res){
            const form = new formidable.IncomingForm();
            // form.uploadDir = path.join(__dirname,'../public/uploads');


            form.on('file',(field,file)=>{
                // fs.rename(file.path,path.join(form.uploadDir,file.name),(err)=>{
                //     if(err){
                //         console.log(err);
                //     }else{
                //         console.log("File Named Successfully")
                //     }
                // })
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