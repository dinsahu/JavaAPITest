/*global
  window,document,globalVars,$,validateCustomer,sessionStorage
*/
'use strict';
//AcceptCustomer functionality implementation
function acceptCustomer(id) {
    var customerId = id;

    // Below Ajax call to API to fetch token in response. Based on token form will be displayed
    $.ajax({
        type: 'GET',
        url: globalVars.AcceptCustomerRequestUrl,//Value fetched from the constants.js file
        data: {
            apiLoginId: globalVars.ApiLoginID,//Value fetched from the constants.js file
            apiTransactionKey: globalVars.ApiTransactionKey,//Value fetched from the constants.js file
            customerId: customerId,
            iFrameCommunicatorUrl: window.location.origin + '/acceptsuite-service/iframeCommunicator.html'
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            if (data.status) {//if response is success
                //Assign the token value to the hidden field inside the form
                document.getElementById('custtoken').value = data.successValue;

                //To set url for the form in the HTML in Accept Customer section
                document.getElementById('send_token').setAttribute('action', 'https://test.authorize.net/customer/manage');

                //Submit form with token to load iframe
                document.getElementById('send_token').submit();
                document.getElementById('load_profile').style.display = 'block';
            } else {
                //on failure, show error message
                document.getElementById('msgCS').innerHTML = '';
                document.getElementById('msgCS').innerHTML = data.errorMessage;
                var element = document.getElementById('alertCS');
                element.classList.remove('alert-success');
                element.classList.add('alert-danger');
                element.style.display = 'block';
            }
            document.getElementById('acceptCustomer').style.display = 'block';
            document.getElementById('acceptCustomerId').style.display = 'none';
            document.getElementById('acceptCustomerManage').style.display = 'block';
        },
        error: function (textStatus) {
            document.getElementById('msgCS').innerHTML = '';
            document.getElementById('msgHS').innerHTML = textStatus;
            var element = document.getElementById('alertCS');
            element.classList.remove('alert-success');
            element.classList.add('alert-danger');
            element.style.display = 'block';
        }
    });
}

//Show details on click of info icon in accept customer pop up
function showInfo() {
    var display = document.getElementById('idScenarios').style.display;
    if (display === 'block') {
        document.getElementById('idScenarios').style.display = 'none';
    } else {
        document.getElementById('idScenarios').style.display = 'block';
    }
}

//On click of continue button in accept customer pop up in dashboard page
function Redirect() {
    var customerId = '',
        result = '';
    document.getElementById('invalidCustomer').style.display = 'none';
    customerId = document.getElementById('txtCustomerId').value;
    if (customerId === '') {
        document.getElementById('txtCustomerId').focus();
        document.getElementById('invalidCustomer').style.display = 'inherit';
        document.getElementById('invalidCustomer').innerHTML = 'Please enter Customer ID';
    } else {
        //Validation of customer id will be done by using the below function
        result = validateCustomer(customerId);

        if (result.valid) {//if it is a valid customer id
            if (result.status) {
                window.location.href = 'index.html?producttype=acceptcustomer&customerid=' + customerId;
                //if Customer id is already validated
                sessionStorage.setItem('isValidated', 'true');
            } else {
                document.getElementById('invalidCustomer').style.display = 'inherit';
                document.getElementById('invalidCustomer').innerHTML = result.message;
            }
        } else {
            document.getElementById('invalidCustomer').style.display = 'inherit';
            document.getElementById('invalidCustomer').innerHTML = result.message;
        }
    }
}

//To close accept customer pop up on cancel button click
function CloseAcceptCustomer() {
    window.location.href = 'index_all.html';
}