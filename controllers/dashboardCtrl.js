/******************************************************************************
 *
 *  Purpose         : Dashboard controller for controlling dashboard.html.
 *
 *  @description
 *
 *  @file           : dashboardCtrl.js
 *  @overview       : to handle events on dashboard.html.
 *  @author         : Aniket Chile
 *  @version        : 1.0
 *  @since          : 16-04-2018
 *
 ******************************************************************************/
app.controller('dashboardCtrl', function($scope, $mdDialog) {
  $scope.showDialog = function(clickEvent, item) {
    $mdDialog.show({
      locals: {
        mobileData: item
      },
      controller: DialogController,
      templateUrl: 'templates/mobileDialog.html',
      parent: angular.element(document.body),
      targetEvent: clickEvent,
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    });
  };

  /**
   * @description DialogController for handling dialog controls.
   * @param {service} $scope is a service
   * @param {service} $mdDialog is a service
   * @param {object} mobileData clicked object data
   */
  function DialogController($scope, $mdDialog, mobileData) {
    $scope.mobileData = mobileData;
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
  }
});
