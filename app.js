/******************************************************************************
 *
 *  Purpose         : App descriptor for state handling.
 *
 *  @description
 *
 *  @file           : app.js
 *  @overview       : delcaration of various states and dependencies is done here.
 *  @author         : Aniket Chile
 *  @version        : 1.0
 *  @since          : 16-04-2018
 *
 ******************************************************************************/
var app =angular.module('mobileApp',['ui.router','ngMaterial','ngAnimate','ngMessages','jkAngularRatingStars']);

app.config(function($stateProvider,$urlRouterProvider){

$urlRouterProvider.otherwise('login');

$stateProvider
   .state('login',{
     url : '/login',
     templateUrl : 'templates/login.html'
   })
   .state('home',{
     url : '/home',
     templateUrl : 'templates/home.html',
     controller : 'homeCtrl'
   })
   .state('home.dashboard',{
     url : '/dashboard',
     templateUrl : 'templates/dashboard.html',
     controller : 'dashboardCtrl'
   });
});
