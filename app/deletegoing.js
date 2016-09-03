var Going = require('./models/going');
module.exports=function(req,res,next){
  Going.find({userId:req.user.id,barId:req.body.id}).remove(function(err){
        if(err)return next(err);
        res.end("1");
  });
}
