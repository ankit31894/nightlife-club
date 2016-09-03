var Going = require('./models/going');
module.exports=function(req,res,next){
  Going.find({userId:req.user.id},function(err,entries){
      if(err)return next(err);
      res.json(entries);
  });
}
