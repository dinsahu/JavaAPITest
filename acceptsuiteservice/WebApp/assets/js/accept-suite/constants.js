/*global
$,window
*/
'use strict';

var jsondata = "";
var globalVars = "";
function loadJSON() {
  $.ajax({
      url: 'scripts/userInputs.json',
      async: false,
      dataType: 'json',
      success: function (jsondata) {
          globalVars = {

              // Default sandbox credentials
        	  ClientKey : '885qTmu8Mk82TyJr3P8JZXRdeJnesy4LC4VM8XvvE9e78z6ENhR5zt82zW4kSGz5',

        	  ApiLoginID : '6u3YgDH4e',

        	  ApiTransactionKey : '7RG599ZKdyfk248e',

              // Web API URL's
        	  AcceptJSRequestUrl : 'https://'+jsondata.HOST_NAME+':'+jsondata.PORT_NUMBER+'/acceptsuite-service/rest/api/acceptjs',

        	  AcceptHostedRequestUrl : 'https://'+jsondata.HOST_NAME+':'+jsondata.PORT_NUMBER+'/acceptsuite-service/rest/api/accepthosted',

        	  AcceptCustomerRequestUrl : 'https://'+jsondata.HOST_NAME+':'+jsondata.PORT_NUMBER+'/acceptsuite-service/rest/api/acceptcustomer',

        	  ValidateCustomerRequestUrl : 'https://'+jsondata.HOST_NAME+':'+jsondata.PORT_NUMBER+'/acceptsuite-service/rest/api/validatecustomer',

              // available customer id
        	  ValidCustomer : '1916219194'

          };
      }
  });
}
window.onload = loadJSON();

