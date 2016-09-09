(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);
LunchCheckController.$inject = ['$scope'];

function LunchCheckController ($scope) {
  $scope.Dishes = '';
  $scope.Message = '';

  $scope.GetMessage = function () {
    if ($scope.Dishes.trim() === '') {
       $scope.Message = "Please enter data first";
       return;
    }

    var GetNumberDishes = function()
    {
       var separator = ',';
       var stringArray = $scope.Dishes.split(separator);
       return stringArray.length;
    };
    var numberDishes = GetNumberDishes();
    console.log("Number dishes: " + numberDishes);

    if (numberDishes <= 3)
    {
      $scope.Message = 'Enjoy!';
    }
    else
    {
      $scope.Message = 'Too much!';
    }
  };

}

})();
