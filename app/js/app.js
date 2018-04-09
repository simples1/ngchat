angular.module('myApp', ['io.service']).

run(function (io) {

}).

controller('MainController', function ($scope, io) {
  $scope.hideChatArea = true;
  $scope.hideLoginArea = false;

  $scope.join = function () {
    $scope.hideChatArea = false;
    $scope.hideLoginArea = true;

    io.init({
      ioServer: 'http://localhost:3696'
    });
  }



  $scope.send = function () {
    io.emit({
      message: $scope.message
    });
    $scope.message = null;
  }

  io.watch('message', function (data) {
    console.log("watch",data)
    $scope.lastMessage = data.message;

    $("#chat").append("<div class='well'><div>"+data.message+"</div><div class='chattime'>"+ new Date().toUTCString() +"</div></div>");

    $scope.$apply();
  });
});
