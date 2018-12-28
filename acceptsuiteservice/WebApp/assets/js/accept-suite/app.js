/*global
  window, document, acceptUI, validateCustomer, acceptHosted, globalVars,sessionStorage, acceptCustomer, unescape, getComputedStyle, CommunicationHandler,loadJSON
*/
'use strict';
var activeCont = '';
var elements = '';

//Below function is used to fetch the values of the parameters(producttype/customerid) passed in the URL.
function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//To check if customer ID is passed by the user along with product type for Accept.js and Accept.js UI request URLs
function checkForInvalidProduct(pageurl) {
    //Accept.js and Accept.js UI accepts only product type
     //If the user passes customer id to Accept.js or Accept.js UI product type, then user gets redirected to the error message section
    if (pageurl.toLowerCase().indexOf('&customerid=') > 0 || pageurl === '') {
        //The content of all the 4 product types is disabled on the page
        elements = document.getElementsByClassName('productCont');
        Array.prototype.forEach.call(elements, function (element) {
            element.style.display = 'none';
        });
        //Below code gets executed on invalid page request by the user
        document.getElementById('invalidPage').innerHTML = '';
        document.getElementById('invalidPage').innerHTML = 'Product Type not Found';
        document.getElementById('invalidProduct').style.display = 'block';
    } else {
        //If the user selects Accept.js UI product type in the dashboard page
        if (activeCont === 'acceptui') {
            document.getElementById('acceptui').style.display = 'block';
            acceptUI();
        } else {//If the user selects Accept.js product type in the dashboard page
            document.getElementById('acceptjs').style.display = 'block';
            //By default credit card radio button is selected for accept js
            document.getElementById('rdCard').click();
        }
    }
}

//If invalid customer is passed in accept hosted/accept customer
function isInvalidCustomer() {
    elements = document.getElementsByClassName('productCont');
    //The content of all the 4 product types is disabled on the page
    Array.prototype.forEach.call(elements, function (element) {
        element.style.display = 'none';
    });
    document.getElementById('invalidPage').innerHTML = '';
    document.getElementById('invalidPage').innerHTML = 'Customer not Found';
    document.getElementById('invalidProduct').style.display = 'block';
}

//Below function gets executed when user clicks on any of the 4 product types in dashboard page
function loadpage() {
    var pageurl = window.location.href,
        customerId = "",
        customerValidation = {},
        product = '',
        customerIdValidationStatus = false;

    //On page load, the content of all the 4 product types is disabled
    elements = document.getElementsByClassName('productCont');
    Array.prototype.forEach.call(elements, function (element) {
        element.style.display = 'none';
    });
    //Below line reads the product type selected by the user in dashboard page
    product = getParameterByName('producttype', window.location.href.toLowerCase());
    if (pageurl.toLowerCase().indexOf('?producttype=') > 0) {
        //If the user clicks Accept.js product type in the dashboard page, the following code gets executed.
        if (product === 'acceptjs') {
            //The product type selected by the user in the dashboard page is assigned to the activeCont variable which is used for future reference
            activeCont = 'acceptjs';
            //Below function checks if customer ID is passed in the request URL
            checkForInvalidProduct(pageurl);
        } else if (product === 'acceptui') {//If the user clicks Accept.js UI product type in the dashboard page, the following code gets executed
             //The product type selected by the user in the dashboard page is assigned to the activeCont variable which is used for future reference
            activeCont = 'acceptui';
            //Below function checks if customer ID is passed in the request URL
            checkForInvalidProduct(pageurl);
        } else if (product === 'accepthosted') { //If the user clicks Accept Hosted product type in the dashboard page, the following code gets executed.
            //Below logic is to check if there are more than one parameter passed in the URL
            if (pageurl.toLowerCase().indexOf('&') > 0) {
                 //Customer ID is an optional parameter for Accept Hosted product type
                //Below code gets executed when the user passes customer id in the request URL
                if (pageurl.toLowerCase().indexOf('&customerid=') > 0) {
                    customerId = getParameterByName('customerid', window.location.href.toLowerCase());

                    //Validation of customer id will be done by using the below function
                    customerValidation = validateCustomer(customerId);

                    //If the customer id is a valid id, then AcceptHosted function gets executed
                    if (customerValidation.valid) {
                        acceptHosted(customerId);
                    } else {
                        //If the invalid customer id declared in the URL, then user gets redirected to the error message section
                        isInvalidCustomer();
                    }
                } else { //Below code gets executed when the user passes when there are more than one parameters (other than customer id) which are invalid in the request URL
                    //Below code gets executed when user passes invalid parameters in the URL
                    checkForInvalidProduct('');
                }
            } else {
                //When customer id parameter is not passed in the URL, AcceptHosted function gets executed
                acceptHosted('');
            }
        } else if (product === 'acceptcustomer') { //If the user clicks Accept Customer product type in the dashboard page, the following code gets executed.
            //Below line populates the customer id textbox with a valid customer id
            document.getElementById('txtCustomerId').value = globalVars.ValidCustomer;
            //Below code gets executed when the user passes customer id in the request URL
            if (pageurl.toLowerCase().indexOf('&customerid=') > 0) {
                document.getElementById('acceptCustomer').style.display = 'none';
                //Below line gets the customer id declared in the url by the user
                customerId = getParameterByName('customerid', window.location.href.toLowerCase());

                //Below function checks if the customer id is already validated or not
                //Customer id validaton occurs on click of continue button in dashboard and on accept customer page load
                //In order to avoid multiple validation requests to API, storing the validation status in the session storage
                customerIdValidationStatus = sessionStorage.getItem('isValidated');
                //If customer id is not validated
                if (customerIdValidationStatus !== 'true') {
                    //Validation of customer id will be done by using the below function
                    customerValidation = validateCustomer(customerId);

                    //If the customer id is a valid id, then AcceptCustomer function gets executed
                    if (customerValidation.valid) {
                        acceptCustomer(customerId);
                    } else {
                        //If the invalid customer id declared in the URL, then user gets redirected to the error message section
                        isInvalidCustomer();
                    }
                } else { //If customer id is already validated in dashboard page
                    acceptCustomer(customerId);
                    sessionStorage.setItem('isValidated', 'false');
                }
            } else {
                //If customer id is not provided in the URL, a pop up to enter customer id is displayed.
                document.getElementById('acceptCustomer').style.display = 'block';
            }
        } else {
            //Below code gets executed when user passes invalid product type parameters in the URL
            checkForInvalidProduct('');
        }
    } else {
        //Below code gets executed when user passes invalid product type parameters in the URL
        if (document.getElementById('invalidPage') !== null) {
            checkForInvalidProduct('');
        }
    }
}

loadpage();

//Navigation to accept suite pages on button click from dashboard page
function LoadAcceptPage(pageType) {
    switch (pageType) {
    case 'acceptJs':
        window.location.href = 'index.html?producttype=acceptjs';
        break;
    case 'acceptUi':
        window.location.href = 'index.html?producttype=acceptui';
        break;
    case 'acceptHosted':
        window.location.href = 'index.html?producttype=accepthosted';
        break;
    case 'acceptCustomer':
        window.location.href = 'index.html?producttype=acceptcustomer';
        break;
    }
}

//On cancel button click, the user navigates back to dashboard page
function RedirectToDashboard() {
    window.location.href = 'index_all.html';
}

//iframeCommunicator is used for accept hosted and accept customer
//IFrameCommunicator is a small html page containing a JavaScript that listens for events
//To securely communicate between our Accept Hosted form/Accept customer form and your web page
window.CommunicationHandler = {};
function parseQueryString(str) {
    var vars = [],
        arr = str.split('&'),
        pair;
    Array.prototype.forEach.call(arr, function (arrValue) {
        pair = arrValue.split('=');
        vars[pair[0]] = unescape(pair[1]);
    });
    return vars;
}

//Methods for accept hosted/accept customer iframes that executes on receiving message in iframeCommunicator
CommunicationHandler.onReceiveCommunication = function (argument) {
    var params = parseQueryString(argument.qstr),
        parentFrame = argument.parent.split('/')[4],
        frame = null,
        transResponse = {},
        currentdate = '';
    switch (parentFrame) {
        //Accept hosted form is fetched
    case 'manage':
        frame = document.getElementById('load_profile');
        break;
        //Accept customer form is fetched
    case 'payment':
        frame = document.getElementById('load_payment');
        break;
    }

    switch (params.action) {
        //To resize the iframe used in accept hosted and accept customer
    case 'resizeWindow':
        //Below code resizes the accept customer form
        if (parentFrame === 'manage' && parseInt(params.height, 10) < 1150) {
            //Kept for future reference, Currently the height and width is adjusted through css
            //params['height']=450;
            //params['width']=800;
        }
        //Below code resizes the accept hosted form
        if (parentFrame === 'payment' && parseInt(params.height, 10) < 1000) {
                //Kept for future reference, Currently the height and width is adjusted through css
                //params['height']=330;
                //params['width']=50;
        }
        //Below code resizes the accept hosted form
        if (parentFrame === 'payment' && getComputedStyle(document.querySelector('.w100')).width < '687.297px') {
            params.height = +params.height + 100;
            frame.height = parseInt(params.height, 10);
            frame.width = parseInt(params.width, 10);
        } else {
            frame.height = parseInt(params.height, 10);
            frame.width = parseInt(params.width, 10);
        }
        break;

        //on click on cancel button in accept hosted, it gets redirected to dashboard page
    case 'cancel':
        if (parentFrame === 'payment') {
            window.location.href = 'index_all.html';
        }
        break;

        //On successful payment in Accept Hosted below code gets executed and confirmation page is displayed
    case 'transactResponse':
        transResponse = JSON.parse(params.response);
        if (parentFrame === 'payment') {
            //To hide payment and cart panels and show confirmation page
            document.getElementById('cartHosted').style.display = 'none';
            document.getElementById('hostedPayment').style.display = 'none';

            //To append current time and date in confirmation page
            currentdate = new Date(transResponse.dateTime + ' UTC');
            document.getElementById('orderID').innerHTML = transResponse.transId;
            document.getElementById('orderDate').innerHTML = currentdate;
            document.getElementById('confirmationPage').style.display = 'block';
        }
        break;
    }
};
