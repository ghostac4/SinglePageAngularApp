/******************************************************************************
 *
 *  @description
 *
 *  @file           : sidebar.js
 *  @overview       : directive sidebar.js for Sidenav.
 *  @author         : Aniket Chile
 *  @version        : 1.0
 *  @since          : 16-04-2018
 *
 ******************************************************************************/
app.directive('sidebar',function(){
  return{
    restrict: 'E',
    templateUrl : 'templates/sidebar.html'
  };
});
