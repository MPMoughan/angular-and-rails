var rafflerApp = angular.module("raffler", ["rails"]);

rafflerApp.factory("Player", function(railsResourceFactory){
  var resource = railsResourceFactory({
    url: '/players',
    name: 'player' });
  return resource;
});

rafflerApp.controller('RaffleController', ["$scope", "Player", function($scope, Player) {

    Player.query().then(function(results){
      $scope.players = results;
    });

    $scope.pickAWinner = function(){
        $scope.players.forEach(function(player){
        player.winner = false;
        player.update();

          var aWinner = $scope.players[Math.floor(Math.random() * $scope.players.length)];
          console.log(aWinner);
          aWinner.winner = true;
          aWinner.update();
      });
    };

    $scope.addPlayer = function (){
      console.log($scope.newName);
      var newPlayer = new Player ({
        name: $scope.newName,
        rating: 5,
        winner: false
      });
    newPlayer.create().then(function(newPlayerInRails){
      $scope.players.push(newPlayerInRails);
      console.log("From rails:" + newPlayerInRails);
      });
    };
}]);

