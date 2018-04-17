/******************************************************************************
 *
 *  @description
 *
 *  @file           : navbar.js
 *  @overview       : directive navbar.
 *  @author         : Aniket Chile
 *  @version        : 1.0
 *  @since          : 16-04-2018
 *
 ******************************************************************************/
app.directive('navbar',function(){
  return{
    restrict: 'E',
    templateUrl : 'templates/navbar.html'
  };
});
