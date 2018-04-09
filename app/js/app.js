angular.module('myApp', ['io.service']).

controller('MainController', function ($scope, io) {
  $scope.hideChatArea = true;
  $scope.hideLoginArea = false;
    $scope.list_users = []

  $scope.join = function () {
    $scope.hideChatArea = false;
    $scope.hideLoginArea = true;

    io.init({
      ioServer: 'http://localhost:3696',
    });

    io.newUser($scope.nickname);
  }

  $scope.send = function () {
    io.emit({
      message: $scope.message
    });
    $scope.message = null;
  }

  io.watch('user_list2', function (data) {
    console.log("client users",data)
    $scope.list_users = data;
    $scope.$apply();

  });

  io.watch('message', function (data) {
    console.log(data)
    $("#chat").append("<div class='well'><div><b class='username'>"+data.username+":</b>"+data.message+"</div><div class='chattime'>"+ new Date().toUTCString() +"</div></div>");

    $scope.$apply();
  });
});
