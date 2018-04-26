/******************************************************************************
 *
 *  Purpose         : Home controller for sidebar list and filter operations.
 *
 *  @description
 *
 *  @file           : homeCtrl.js
 *  @overview       : controller for displaying sidenav data and option handler.
 *  @author         : Aniket Chile
 *  @version        : 1.0
 *  @since          : 16-04-2018
 *
 ******************************************************************************/
app.controller('homeCtrl', function($scope, $mdDialog, Json, $timeout, $mdSidenav, $state, $filter, $mdPanel) {
  $scope.loading = true;
  var data;
  var data2;
  var selectedManufacturer = [];
  var selectedStorage = [];
  var selectedOs = [];
  var selectedCamera = [];

  /**
   * @description function to lift card on mouse enter.
   * @param {string} id is an id of div which is to be lifted.
   */
  $scope.liftCard = function(id) {
    var element = angular.element(document.getElementById(id));
    element.addClass('md-whiteframe-9dp');
  };

  /**
   * @description function to settle card on mouse leave.
   * @param {string} id is an id of div which is to be settled.
   */
  $scope.settlecard = function(id) {
    var element = angular.element(document.getElementById(id));
    element.removeClass('md-whiteframe-9dp');
  };

  /**
   * @description $timeout used to load data from json file after 1ms.
   */
  $timeout(function() {
    Json.then(function(response) {
      $scope.data = response.data;
      $scope.loading = false;
      $scope.data2 = response.data;
    });
  }, 1);
  $scope.toggleLeft = buildToggler('left');


  /**
   * @param {string} componentId is a string to determine the direction of sidenav
   */
  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
      var isOpen = $mdSidenav(componentId).isOpen();
      if (isOpen) {
        document.getElementById('dashboard').style.marginLeft = '320px';
      } else {
        document.getElementById('dashboard').style.marginLeft = '0px';
      }
    };
  }

  /**
   * @description $mdSidenav service used for backdrop and resizing content window.
   */
  $mdSidenav('left', true).then(function(instance) {
    // On close callback to handle close, backdrop click, or escape key pressed.
    // Callback happens BEFORE the close action occurs.
    instance.onClose(function() {
      document.getElementById('dashboard').style.marginLeft = '0px';
    });
  });

  /**
   * @description auto load the dashboard.html inside nested ui-view.
   */
  $state.go('home.dashboard');

  /**
   * @description function to maintain checked item into selected list.
   * @param {string} category is a string from list of categories
   * @param {string} keyword is a string which is been checked
   */
  $scope.toggle = function(category, keyword) {
    switch (category) {
      case 'manufacturer':
        addRemoveItems(selectedManufacturer, keyword);
        break;
      case 'storage':
        addRemoveItems(selectedStorage, keyword);
        break;
      case 'os':
        addRemoveItems(selectedOs, keyword);
        break;
      case 'camera':
        addRemoveItems(selectedCamera, keyword);
        break;
    }
  };

  var addRemoveItems = function(selectedList, keyword) {
    var index = selectedList.indexOf(keyword);
    if (index > -1) {
      selectedList.splice(index, 1);
    } else {
      selectedList.push(keyword);
    }
  };
  $scope.arrManufacturer = selectedManufacturer;
  $scope.arrStorage = selectedStorage;
  $scope.arrOs = selectedOs;
  $scope.arrCamera = selectedCamera;
});

/**
 * @description filter for getting list of items based on selected options.
 * @return {array} filtered list using the selected items .
 */
app.filter('commonString', function() {
  /**
   * @param {array} items is a list of items from ng-repeat
   * @param {array} arrManufacturer is list of manufacturer selected options
   * @param {array} arrStorage is list of storage selected options
   * @param {array} arrOs is list of Os selected options
   * @param {array} arrCamera is list camera of selected options
   * @return {array} list of filtered items.
   */
  return function(items, arrManufacturer, arrStorage, arrOs, arrCamera) {
    var filtered = [];
    var temparr = items;

    /**
     * @description function to compare data from two list and filter.
     * @param {array} dataList is list data items on which filteration is to be applied.
     * @param {array} selectedList is list of selected list for filteration.
     */
    var compareData = function(dataList, selectedList) {
      for (var j = 0; j < dataList.length; j++) {
        var item = dataList[j];

        for (var i = 0; i < selectedList.length; i++) {
          var selectedItem = selectedList[i];
          if (item.specs.manufacturer == selectedItem || item.specs.storage == selectedItem ||
            item.specs.os == selectedItem || item.specs.camera == selectedItem) {
            filtered.push(item);
          }
        }
      }
      temparr = filtered;
      filtered = [];
    };

    if (items != undefined) {

      if (arrManufacturer.length > 0 || arrStorage.length > 0 || arrOs.length > 0 || arrCamera.length > 0) {

        if(arrManufacturer.length > 0){
          compareData(temparr, arrManufacturer);
        }
        if (arrStorage.length > 0) {
          compareData(temparr, arrStorage);
        }
        if (arrOs.length > 0) {
          compareData(temparr, arrOs);
        }
        if (arrCamera.length > 0) {
          compareData(temparr, arrCamera);
        }
      } else {
        temparr = items;
      }
    }
    return temparr;
  };
});
