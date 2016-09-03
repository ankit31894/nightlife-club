angular.module('MainCtrl', []).controller('MainController', function($scope,$http) {
  $scope.formData={location:(sessionStorage.city==undefined?'':sessionStorage.city)};
  $scope.bars=[];
  if(sessionStorage.city!=undefined){
    $scope.current=$scope.formData.location;
    $http({
      url: "/getbars",
      method: "POST",
      data: $scope.formData
     }).success(function(data,status){
      $scope.bars=data;
    })
    sessionStorage.removeItem("city");
  }
  $scope.submit=function($event){
    $event.preventDefault();
    if($scope.formData.location.trim()=="")
    return;
    $scope.current=$scope.formData.location;
    $http({
      url: "/getbars",
      method: "POST",
      data: $scope.formData
     }).success(function(data,status){
      $scope.bars=data;
    })
    return false;
  }
  $scope.go=function($val){
    if($val.joined!=undefined){
      $http({
        url: "/deletegoing",
        method: "POST",
        data: {id:$val.id}
       }).then(function(d){
            $val.going--;
            $val.joined=undefined;
        },function(err){
          if(err.status===401){
            window.location.href="/login/google";
          }
        });

    }
    else{
      $http({
        url: "/insertgoing",
        method: "POST",
        data: {id:$val.id,name:$val.name}
       }).then(function(d){
            $val.going++;
            $val.joined=1;
        },function(err){
          if(err.status===401){
            sessionStorage.city=$scope.current;
            window.location.href="/login/google";
          }
        });

    }
    return false;
  }
});
