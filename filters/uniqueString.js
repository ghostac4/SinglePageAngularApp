/******************************************************************************
 *
 *  Purpose         : Filters the list for uniquesness.
 *
 *  @description
 *
 *  @file           : uniqueString.js
 *  @overview       : filter for getting list of uniqueString from list of string.
 *  @author         : Aniket Chile
 *  @version        : 1.0
 *  @since          : 16-04-2018
 *
 ******************************************************************************/
app.filter('uniqueString',function(){
  /**
   * @param {array} items is a list of items from ng-repeat
   * @param {string} keyword is key for which uniquesnessis to be found
   * @return {array} list of filtered items.
   */
  return function(items,keyword){
    var filtered = [];

    if(items !== undefined){
      for(var i=0;i < items.length;i++){
        var item = items[i];
        var flag = false;

        if(i==0){
          filtered.push(item);
        }else{
          for(var j=0;j < filtered.length;j++){
            var filteredItem = filtered[j];

            if(item.specs[keyword] === filteredItem.specs[keyword]){
              flag = true;
            }
          }

          if(!flag){
            filtered.push(item);
          }
        }
      }
    }
    return filtered;
  };
});
