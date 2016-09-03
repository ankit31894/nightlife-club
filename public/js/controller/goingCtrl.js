angular.module('GoingCtrl', []).controller('GoingController', function($scope,$http) {
  $scope.bars=[];
  $http.get("/getgoing").then(function(data){
    $scope.bars=data.data;
  },function(er){
    if(er.status===401)
      window.location.href="/login/google";
  })
  $scope.stop=function($val){
    $http({
      url: "/deletegoing",
      method: "POST",
      data: {id:$val.barId}
    }).then(function(d){
      $scope.bars.splice($scope.bars.indexOf($val),1);
    },function(err){
      if(err.status===401)
        window.location.href="/login/google";

    });
    return false;
  



  }


});
