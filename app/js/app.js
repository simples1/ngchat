angular.module('myApp', ['io.service']).

run(function (io) {
  io.init({
    ioServer: 'http://localhost:3696'
  });

  io.subscribe()
}).

controller('MainController', function ($scope, io) {

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
