var Going = require('./models/going');
module.exports=function(req,res,next){
  var data={
    barId:req.body.id,
    name:req.body.name,
    createdAt:new Date,
    userId:req.user.id
  }
  var nGoing=new Going(data);
  nGoing.save(function(err){
      if(err)return next(err);
      res.json(nGoing);
  });
}
