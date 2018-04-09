angular.module('io.service', []).
factory('io', function ($http) {
  var socket,
    ioServer,
    ioRoom,
    uu =[],
    watches = {};

  return {
    init: function (conf) {
      console.log("init")

      ioServer = conf.ioServer;
      ioRoom = conf.ioRoom;

      socket = io.connect(conf.ioServer);
      socket.on('event.get_users', function (data) {
        return watches['user_list2'](data);
      })

      socket.on('event.response', function (data) {
        console.log('respones', data)
        var message = data;
        if (data.room === ioRoom) {
          return watches['message'](data.message);
        }
      });

    },

    subscribe: function () {
      socket.emit('event.subscribe', ioRoom);
    },

    emit: function (arguments) {
      console.log("emit")

      socket.emit('event.message', {
        room: ioRoom,
        message: arguments
      });
    },


    watch: function (item, data) {
      console.log("watch", item)
      watches[item] = data;
    },

    unWatch: function (item) {
      console.log("Unwatch")
      delete watches[item];
    },

    newUser: function (item) {
      socket.emit('event.new_user', item);
    }
  };
});
