/*global
  window,document,globalVars,$,validateCustomer,sessionStorage
*/
'use strict';
//AcceptHosted functionality implementation
function acceptHosted(id) {
    var customerId = id;
    // Below Ajax call to API to fetch token in response. Based on token form will be displayed
    $.ajax({
        type: 'GET',
        url: globalVars.AcceptHostedRequestUrl,//Value fetched from the constants.js file
        data: {
            apiLoginId: globalVars.ApiLoginID,//Value fetched from the constants.js file
            apiTransactionKey: globalVars.ApiTransactionKey,//Value fetched from the constants.js file
            iFrameCommunicatorUrl: window.location.origin + '/acceptsuite-service/iframeCommunicator.html',
            customerId: customerId
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            if (data.status) {//if the response is success
                //Assign the token value to the hidden field inside the form
                document.getElementById('hostedtoken').value = data.successValue;

                //To set action url for the form in HTML in Accept Hosted section
                document.getElementById('send_hptoken').setAttribute('action', 'https://test.authorize.net/payment/payment');

                //submit form with token to load iframe
                document.getElementById('send_hptoken').submit();
                document.getElementById('acceptHosted').style.display = 'block';
                document.getElementById('load_payment').style.display = 'block';
            } else {
                //on failure, show error message
                document.getElementById('msgHS').innerHTML = '';
                document.getElementById('msgHS').innerHTML = data.errorMessage;
                var element = document.getElementById('alertHS');
                element.classList.remove('alert-success');
                element.classList.add('alert-danger');
                element.style.display = 'block';
                document.getElementById('acceptHosted').style.display = 'block';
            }

        },
        error: function (textStatus) {
            document.getElementById('msgHS').innerHTML = '';
            document.getElementById('msgHS').innerHTML = textStatus;
            var element = document.getElementById('alertHS');
            element.classList.remove('alert-success');
            element.classList.add('alert-danger');
            element.style.display = 'block';
        }
    });
}

//ValidateCustomer function validates the customer id which is declared in the URL
function validateCustomer(id) {
    var customerId,
        result = {};
    customerId = id;
    //Below ajax call to API to validate the customer id
    $.ajax({
        type: 'GET',
        url: globalVars.ValidateCustomerRequestUrl,//Value fetched from the constants.js file
        data: {
            apiLoginId: globalVars.ApiLoginID,//Value fetched from the constants.js file
            apiTransactionKey: globalVars.ApiTransactionKey,//Value fetched from the constants.js file
            customerId: customerId
        },
        async: false,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            var valid;
            if (data.status) {// if the customer id is valid
                valid = true;
            } else {
                valid = false;
            }
            result = {
                valid: valid,
                status: data.status,
                message: data.errorMessage
            };
        },
        error: function (textStatus) {
            result = {
                valid: false,
                status: false,
                message: textStatus
            };
        }
    });
    return result;
}