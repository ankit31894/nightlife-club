var MainApp=angular.module('MainCtrl', []);
MainApp.factory('current',function(){
    return {location:''}
})
MainApp.controller('MainController', function($scope,current,$http) {
  $scope.current=current;
  $scope.current.location=(sessionStorage.city==undefined?'':sessionStorage.city);
  $scope.formData={location:$scope.current.location};
  $scope.bars=[];
  if(sessionStorage.city!=undefined){
    $http({
      url: "/getbars",
      method: "POST",
      data: $scope.current
     }).success(function(data,status){
      $scope.bars=data;
      $scope.current.location='';
      sessionStorage.removeItem("city");
    })
  }
  $scope.submit=function($event){
    $event.preventDefault();
    if($scope.formData.location.trim()=="")
    return;
    $scope.current.location=$scope.formData.location;
    $http({
      url: "/getbars",
      method: "POST",
      data: $scope.formData
     }).success(function(data,status){
      $scope.bars=data;
    })
    return false;
  }
  $scope.saveToStore=function(){
      console.log($scope.current);
      if($scope.current)
      sessionStorage.city=$scope.current.location;
      window.location.href="/login/google";
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
            sessionStorage.city=$scope.current.location;
            window.location.href="/login/google";
          }
        });

    }
    return false;
  }
});
