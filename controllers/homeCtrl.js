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
        var indexm = selectedManufacturer.indexOf(keyword);
        if (indexm > -1) {
          selectedManufacturer.splice(indexm, 1);
        } else {
          selectedManufacturer.push(keyword);
        }
        break;
      case 'storage':
        var indexs = selectedStorage.indexOf(keyword);
        if (indexs > -1) {
          selectedStorage.splice(indexs, 1);
        } else {
          selectedStorage.push(keyword);
        }
        break;
      case 'os':
        var indexo = selectedOs.indexOf(keyword);
        if (indexo > -1) {
          selectedOs.splice(indexo, 1);
        } else {
          selectedOs.push(keyword);
        }
        break;
      case 'camera':
        var indexc = selectedCamera.indexOf(keyword);
        if (indexc > -1) {
          selectedCamera.splice(indexc, 1);
        } else {
          selectedCamera.push(keyword);
        }
        break;
    }
  };
  $scope.arrManufacturer = selectedManufacturer;
  $scope.arrStorage = selectedStorage;
  $scope.arrOs = selectedOs;
  $scope.arrCamera = selectedCamera;

  $scope.showMenu = function(ev) {
    var position = $mdPanel.newPanelPosition()
      .relativeTo('.profileButton')
      .addPanelPosition($mdPanel.xPosition.ALIGN_START, $mdPanel.yPosition.BELOW);

    var config = {
      attachTo: angular.element(document.body),
      templateUrl: 'templates/profileClick.html',
      panelClass: 'profile',
      position: position,
      openFrom: ev,
      clickOutsideToClose: true,
      escapeToClose: true,
      focusOnOpen: false,
      zIndex: 2
    };

    $mdPanel.open(config);
  };
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
    var temparr = [];

    if (items != undefined) {

      if (arrManufacturer.length > 0 || arrStorage.length > 0 || arrOs.length > 0 || arrCamera.length > 0) {

        for (var j = 0; j < items.length; j++) {
          var item = items[j];

          for (var i = 0; i < arrManufacturer.length; i++) {
            var selectedItem = arrManufacturer[i];
            if (item.specs.manufacturer == selectedItem || item.specs.storage == selectedItem ||
              item.specs.os == selectedItem || item.specs.camera == selectedItem) {
              filtered.push(item);
            }
          }
        }
        if (filtered.length > 0) {
          temparr = filtered;
          filtered = [];
        } else {
          temparr = items;
        }

        if (arrStorage.length > 0) {
          for (var j = 0; j < temparr.length; j++) {
            var item = temparr[j];

            for (var i = 0; i < arrStorage.length; i++) {
              var selectedItem = arrStorage[i];
              if (item.specs.manufacturer == selectedItem || item.specs.storage == selectedItem ||
                item.specs.os == selectedItem || item.specs.camera == selectedItem) {
                filtered.push(item);
              }
            }
          }
          temparr = filtered;
          filtered = [];
        }

        if (arrOs.length > 0) {
          for (var j = 0; j < temparr.length; j++) {
            var item = temparr[j];

            for (var i = 0; i < arrOs.length; i++) {
              var selectedItem = arrOs[i];
              if (item.specs.manufacturer == selectedItem || item.specs.storage == selectedItem ||
                item.specs.os == selectedItem || item.specs.camera == selectedItem) {
                filtered.push(item);
              }
            }
          }
          temparr = filtered;
          filtered = [];
        }

        if (arrCamera.length > 0) {
          for (var j = 0; j < temparr.length; j++) {
            var item = temparr[j];

            for (var i = 0; i < arrCamera.length; i++) {
              var selectedItem = arrCamera[i];
              if (item.specs.manufacturer == selectedItem || item.specs.storage == selectedItem ||
                item.specs.os == selectedItem || item.specs.camera == selectedItem) {
                filtered.push(item);
              }
            }

          }
          temparr = filtered;
          filtered = [];
        }
      } else {
        temparr = items;
      }
    }
    return temparr;
  };
});
