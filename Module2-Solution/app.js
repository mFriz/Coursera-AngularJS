(function () {
  'use strict';

  var app =  angular.module('ShoppingListCheckOff', []);
  app.controller('ToBuyShoppingController', ToBuyShoppingController);
  app.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController);
  app.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyShoppingController.$inject = ['ShoppingListCheckOffService']

  function ToBuyShoppingController (ShoppingListCheckOffService) {
    var remainingListController = this;

    remainingListController.Items = ShoppingListCheckOffService.GetRemainingItems();

    remainingListController.RemoveItem = function(index){
      var item = {
        name: remainingListController.Items[index].name,
        quantity: remainingListController.Items[index].quantity
      };
      ShoppingListCheckOffService.RemoveRemainingItem(item.name, item.quantity);
      ShoppingListCheckOffService.AddToBoughtItems(item.name, item.quantity);
    };
  };

  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService']

  function AlreadyBoughtShoppingController (ShoppingListCheckOffService) {
    var boughtListController = this;
    boughtListController.Items = ShoppingListCheckOffService.GetBoughtItems();

  };

  function ShoppingListCheckOffService(){
    var service = this;
    var remainingItems = [];
    var boughtItems = [];

    var initList = function(boughtItems){
      var item1 = {
        name: "Chicken",
        quantity: 2
      };
      remainingItems.push(item1);

      var item2 = {
        name: "Apples",
        quantity: 5
      };
      remainingItems.push(item2);

      var item3 = {
        name: "Cookies",
        quantity: 1000
      };
      remainingItems.push(item3);
    }

    initList(remainingItems);

    service.GetRemainingItems = function() {
      return remainingItems;
    };

    service.GetBoughtItems = function(){
      return boughtItems;
    };

    service.RemoveRemainingItem = function(itemName, itemQuantity) {
      for (var i = 0; i < remainingItems.length; i++) {
        var item = remainingItems[i];
        var itemFound = false;
        var indexToBeRemoved = -1;
        if ((item.name == itemName) && (item.quantity == itemQuantity))
        {
          itemFound = true;
          indexToBeRemoved = i;
          break;
        }
      }
      if (itemFound == false)
      {
        throw "item was not found and could not be removed";
      }
      remainingItems.splice(indexToBeRemoved, 1);
    };

    service.AddToBoughtItems = function(itemName, itemQuantity) {
      var item = {
        name: itemName,
        quantity: itemQuantity
      };
      boughtItems.push(item);
    };

  };

})();
