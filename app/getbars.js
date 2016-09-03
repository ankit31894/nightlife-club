var Going = require('./models/going');
//var Poll = require('./models/polls');
module.exports=function(req,res,next){
  var Yelp = require('yelp');
  var yelp = new Yelp({
    consumer_key: 'PW6CQgDfto5eGw2y8zKK-g',
    consumer_secret: 'i3Fw318W6BpkOPbZgbqphyF36rI',
    token: 'jgbk0pnYyCmATUByp790I9CcJ8WgM7Yv',
    token_secret: '8j_VS7jeaxv3Z-uzZOFfGmTt_kc',
  });

  // See http://www.yelp.com/developers/documentation/v2/search_api
  yelp.search({ term: 'restaurants', location: req.body.location })
  .then(function (data) {
    var counter=0,limit=20;
    var busi=data.businesses;
    var flag=true;
    busi.forEach(function(el,i){
      Going.count({barId:el.id},function(err,c){
          counter++;
          //inside the count callback to check whether literally all the queries have been completed or not

          if(err)throw new Error("Some Error Occured");
          else el.going=c;
          if(req.user&&req.user.id&&el.going!=0){//eliminate the logged user check if the count is already 0 just for faster
              limit++;
              //limit needs to be increase as now one more count  query will be performed

              Going.count({barId:el.id,userId:req.user.id},function(er,c){
                counter++;
                console.log(er);

                //inside the count callback to check whether literally all the queries have been completed or not
                if(er)throw new Error("Some Error Occured");
                if(c!==0){
                  el.joined=1;
                }
                if(counter==limit&&flag){
                  console.log(busi);
                  res.json(busi);
                  flag=false;
                }
              })
          }
          if(counter==limit&&flag){
            res.json(busi);
            flag=false;
          }
      })
    });
  })
  .catch(function (err) {
    console.log(err);
    return next(err);
  });
}
