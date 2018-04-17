/******************************************************************************
 *
 *  Purpose         : Custom Service to get all the data from json file.
 *
 *  @description
 *
 *  @file           : getJsonInfo.js
 *  @author         : Aniket Chile
 *  @version        : 1.0
 *  @since          : 16-04-2018
 *
 ******************************************************************************/

 /**
  * @param {service} $http is a service to deal with getting data from url
  */
app.factory('Json',function($http){
  return $http.get('products.json');
});
