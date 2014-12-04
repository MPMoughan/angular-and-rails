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

    // pick a winner function for the raffle
    $scope.pickAWinner = function(){
      // clear the raffle each time
      $scope.players.forEach(function(player){
      player.winner = false;
      player.update();
      });

      // randomly select a winner
      var aWinner = $scope.players[Math.floor(Math.random() * $scope.players.length)];
      console.log(aWinner);
      aWinner.winner = true;
      aWinner.update().then(function(newlyCrownedPlayer){
        // console.log("We have a winner!!!");
      });
    };


}]);

