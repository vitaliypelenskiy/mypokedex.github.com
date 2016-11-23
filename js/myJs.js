var pockemonApp = angular.module("pockemonApp",[]);

pockemonApp.controller("pockemonCtrl", function($scope,$http){
var LoadNext;
	$http.get('http://pokeapi.co/api/v1/pokemon/?limit=12').success(function(data) {
		console.log(data);
		$scope.pockemons = data.objects;
      LoadNext = data.meta.next;
		for(var i = 0; i<$scope.pockemons.length; i++){

			$scope.pockemons[i].imgurl ='http://pokeapi.co/media/img/'+$scope.pockemons[i].national_id+'.png';
     
		}
	});
var nextLoad = 2;
$scope.Load = function(){
$http.get('http://pokeapi.co/api/v1/pokemon/?limit='+(12*nextLoad)).success(function(data) {
		console.log(data);
		$scope.pockemons = data.objects;

		for(var i = 0; i<$scope.pockemons.length; i++){

			$scope.pockemons[i].imgurl ='http://pokeapi.co/media/img/'+$scope.pockemons[i].national_id+'.png';

		}
    });
++nextLoad;
}
$scope.moreInformation = function (index){
    var id = $scope.pockemons[index].national_id;
    $http.get('http://pokeapi.co/api/v1/pokemon/'+id).success(function(data) {
		console.log(data);
    $scope.ollInformationAboutPockemon = data;
    $scope.ollInformationAboutPockemon.imgurl ='http://pokeapi.co/media/img/'+id+'.png';
    $scope.totalMoves = $scope.ollInformationAboutPockemon.moves.length;
   $scope.namePockemon = $scope.ollInformationAboutPockemon.name +"  #"+(((id>9)?((id>99)?'':'0'):'00')+id);
});
    document.getElementById("informationGoto").style.display="block";
}
})