/*global
  window,document,globalVars,$,activeCont,Accept
*/
'use strict';
//Accept.js functionality Begin

//On click of radio buttons in Accept.js page
function showData(option) {
    document.getElementById('msg').innerHTML = '';
    document.getElementById('alert').style.display = 'none';
    if (option === 'card') {
        document.getElementById('bank').style.display = 'none';
        document.getElementById('card').style.display = 'block';
    } else {
        document.getElementById('card').style.display = 'none';
        document.getElementById('bank').style.display = 'block';
    }
    document.getElementById('btns').style.display = 'block';
}

//Accept.js client side validation begin

//Globally declaring all input parameters in Accept js which will be used for further references and to avoid redundancy
//Card fields
var cardNo = document.getElementById('cardNumber');
var expMonth = document.getElementById('expMonth');
var expYear = document.getElementById('expYear');
var cardCode = document.getElementById('cardCode');

//Bank fields
var accountNumber = document.getElementById('accountNumber');
var routingNumber = document.getElementById('routingNumber');
var nameOnAccount = document.getElementById('nameOnAccount');

//Hidden fields to store response token values
var dataDescriptor = document.getElementById('dataDescriptor');
var dataValue = document.getElementById('dataValue');

//To validate fields in Accept JS form
function validatePaymentFields() {
    var sel = document.querySelector('input[name="optradio"]:checked').value,
        radios = '',
        val = '',
        iserror = '',
        element = '';
    if (sel === 'card') {
        if (cardNo.value === '') {
            cardNo.classList.add('error');
        } else {
            cardNo.classList.remove('error');
            cardNo.classList.add('success');
        }
        if (expMonth.value === '') {
            expMonth.classList.add('error');
        } else {
            expMonth.classList.remove('error');
            expMonth.classList.add('success');
        }
        if (expYear.value === '') {
            expYear.classList.add('error');
        } else {
            expYear.classList.remove('error');
            expYear.classList.add('success');
        }
    } else {

        if (accountNumber.value === '') {
            accountNumber.classList.add('error');
        } else {
            accountNumber.classList.remove('error');
            accountNumber.classList.add('success');
        }
        if (routingNumber.value === '') {
            routingNumber.classList.add('error');
        } else {
            routingNumber.classList.remove('error');
            routingNumber.classList.add('success');
        }
        if (nameOnAccount.value === '') {
            nameOnAccount.classList.add('error');
        } else {
            nameOnAccount.classList.remove('error');
            nameOnAccount.classList.add('success');
        }
        //To get selected value of account type
        radios = document.getElementsByName('acntradio');
        Array.prototype.forEach.call(radios, function (radio) {
            if (radio.checked) {
                val = radio.value;
            }
        });

        if (val === '' || val === null) {
            document.querySelector('input[name="acntradio"]').classList.add('error');
        } else {
            document.querySelector('input[name="acntradio"]').classList.remove('error');
            document.querySelector('input[name="acntradio"]').classList.add('success');
        }
    }

    iserror = document.getElementById(sel).getElementsByClassName('error');
    if (iserror.length > 0) {//if an element with error class exists
        document.getElementById('errDetails').style.display = 'none';
        document.getElementById('msg').innerHTML = '';
        document.getElementById('msg').innerHTML = 'Please provide all required fields';
        element = document.getElementById('alert');
        element.classList.remove('alert-success');
        element.classList.add('alert-danger');
        element.style.display = 'block';
        return 'false';
    }
    return 'true';
}

//To restrict inputs to allow only numbers in Accept.js page
function isNumber(evt) {
    evt = evt ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

//On entering value in textboxes, validate input in Accept.js page
function onTextInput(id) {
    var visa = ['4'],
        JCb = ['3088'],
        discover = ['6011', '64', '65'],
        amex = ['37', '34'],
        dinersClub = ['38'],
        masterCard = ['51', '52', '53', '54', '55', '2221', '2222', '2223'],
        element = document.getElementById(id),
        cardNumElem = document.querySelector('input[name="cardNumber"]'),
        data = '';
    if (element.value === '') {
        cardNumElem.classList.remove('icon-type-mastercard');
        cardNumElem.classList.remove('icon-type-dinersclub');
        cardNumElem.classList.remove('icon-type-amex');
        cardNumElem.classList.remove('icon-type-discover');
        cardNumElem.classList.remove('icon-type-jcb');
        cardNumElem.classList.remove('icon-type-visa');
    }


    if (id === 'cardNumber' && element.value !== '') {

        if (visa.indexOf(element.value) > -1 || visa.indexOf((element.value).substring(0, 1)) > -1) {
            cardNumElem.classList.add('icon-type-visa');
        } else if (JCb.indexOf(element.value) > -1 || JCb.indexOf((element.value).substring(0, 4)) > -1) {
            cardNumElem.classList.add('icon-type-jcb');
        } else if (discover.indexOf(element.value) > -1 || discover.indexOf((element.value).substring(0, 4)) > -1 || discover.indexOf((element.value).substring(0, 2)) > -1) {
            cardNumElem.classList.add('icon-type-discover');
        } else if (amex.indexOf(element.value) > -1 || amex.indexOf((element.value).substring(0, 2)) > -1) {
            cardNumElem.classList.add('icon-type-amex');
        } else if (dinersClub.indexOf(element.value) > -1 || dinersClub.indexOf((element.value).substring(0, 2)) > -1) {
            cardNumElem.classList.add('icon-type-dinersclub');
        } else if (masterCard.indexOf(element.value) > -1 || masterCard.indexOf((element.value).substring(0, 4)) > -1 || masterCard.indexOf((element.value).substring(0, 2)) > -1) {
            cardNumElem.classList.add('icon-type-mastercard');
        } else {
            cardNumElem.classList.remove('icon-type-mastercard');
            cardNumElem.classList.remove('icon-type-dinersclub');
            cardNumElem.classList.remove('icon-type-amex');
            cardNumElem.classList.remove('icon-type-discover');
            cardNumElem.classList.remove('icon-type-jcb');
            cardNumElem.classList.remove('icon-type-visa');
        }
    }

    if (id === 'expMonth') {
        data = element.value;
        if (!(data >= 1 && data <= 12)) {//To check month in range 1-12
            expMonth.value = '';
            element.classList.remove('success');
            element.classList.add('invalid');
        } else {
            if (element.value !== '') {
                element.classList.remove('invalid');
                element.classList.add('success');
            }
        }
    } else {
        if (element.value !== '') {
            element.classList.remove('invalid');
            element.classList.remove('error');
            element.classList.add('success');
        } else {
            element.classList.remove('invalid');
            element.classList.remove('success');
            element.classList.add('error');
        }
    }
}

//Accept.js client side validation end
//Accept.js paymentFormUpdate functionality implementation
function paymentFormUpdate() {
    // To blank out the fields before submitting them to your server.
    //Clear all fields on submit in accept js
    cardNo.value = '';
    expMonth.value = '';
    expYear.value = '';
    cardCode.value = '';
    accountNumber.value = '';
    routingNumber.value = '';
    nameOnAccount.value = '';
    var rds = document.getElementsByName('acntradio'),
        cardNumElem = document.querySelector('input[name="cardNumber"]'),
        element = '';
    if (cardNumElem.value === '') {
        cardNumElem.classList.remove('icon-type-mastercard');
        cardNumElem.classList.remove('icon-type-dinersclub');
        cardNumElem.classList.remove('icon-type-amex');
        cardNumElem.classList.remove('icon-type-discover');
        cardNumElem.classList.remove('icon-type-jcb');
        cardNumElem.classList.remove('icon-type-visa');
    }

    Array.prototype.forEach.call(rds, function (rd) {
        rd.checked = false;
    });

    element = document.getElementsByClassName('error');
    while (element.length) {
        element[0].classList.remove('error');
    }

    element = document.getElementsByClassName('success');
    while (element.length) {
        element[0].classList.remove('success');
    }
}

//Below function calls the web API for accept.js/accept ui by passing the token value and shows confirmation page on successful payment
function showConfirmationPage(tokenVal) {
    // Ajax call to API by passing token. Based on the response, if payment gets success confirmation page is displayed to the user
    $.ajax({
        type: 'GET',
        url: globalVars.AcceptJSRequestUrl,//Value fetched from the constants.js file
        data: {
            apiLoginId: globalVars.ApiLoginID,//Value fetched from the constants.js file
            apiTransactionKey: globalVars.ApiTransactionKey,//Value fetched from the constants.js file
            token: tokenVal
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            var currentdate = '',
                element = '';
            switch (activeCont) {
                //if payment is done using accept.js product type
            case 'acceptjs':
                document.getElementById('alert').style.display = 'none';
                document.getElementById('msg').innerHTML = '';

                //Below function clears all input fields in accept.js
                paymentFormUpdate();
                if (data.status) {//On successful payment, below code gets executed
                        //To disable pay button
                    document.getElementById('btnPayJS').disabled = true;
                    //To append current datetime and transaction id in confirmation page
                    currentdate = new Date();
                    document.getElementById('orderID').innerHTML = data.successValue;
                    document.getElementById('orderDate').innerHTML = currentdate;
                    document.getElementById('cartJS').style.display = 'none';
                    document.getElementById('paymentDivJS').style.display = 'none';
                    document.getElementById('confirmationPage').style.display = 'block';
                } else {
                    //on failure, show error message
                    document.getElementById('msg').innerHTML = data.errorMessage;
                    element = document.getElementById('alert');
                    element.classList.remove('alert-success');
                    element.classList.add('alert-danger');
                    element.style.display = 'block';
                }
                break;
            //if payment is done using accept ui product type
            case 'acceptui':
                document.getElementById('alertUI').style.display = 'none';
                document.getElementById('msgUI').innerHTML = '';
                if (data.status) {//on successful payment below code gets executed
                    //To disable pay button
                    document.getElementById('btnAcceptUI').disabled = true;
                    //To append current datetime and transaction id in confirmation page
                    currentdate = new Date();
                    document.getElementById('orderID').innerHTML = data.successValue;
                    document.getElementById('orderDate').innerHTML = currentdate;
                    document.getElementById('cartUI').style.display = 'none';
                    document.getElementById('confirmationPage').style.display = 'block';
                } else {
                    //on failure in payment, show error message
                    document.getElementById('msgUI').innerHTML = data.errorMessage;
                    element = document.getElementById('alertUI');
                    element.classList.remove('alert-success');
                    element.classList.add('alert-danger');
                    element.style.display = 'block';
                }
                break;
            }
        },
        error: function (textStatus) {
            var element = '';
            switch (activeCont) {
            case 'acceptjs':
                document.getElementById('msg').innerHTML = '';
                document.getElementById('msg').innerHTML = textStatus;
                element = document.getElementById('alert');
                element.classList.remove('alert-success');
                element.classList.add('alert-danger');
                element.style.display = 'block';
                break;
            case 'acceptui':
                document.getElementById('msgUI').innerHTML = '';
                document.getElementById('msgUI').innerHTML = textStatus;
                element = document.getElementById('alertUI');
                element.classList.remove('alert-success');
                element.classList.add('alert-danger');
                element.style.display = 'block';
                break;
            }
        }
    });
}

//Response handler for accept js and accept ui
function responseHandler(response) {
    var i = 0,
        container = document.getElementById('msg'),
        value = '',
        element = '',
        node = '',
        msgdiv = '',
        tokenVal = '';
    //if response has errors, then the below code gets executed
    if (response.messages.resultCode === 'Error') {
        container.innerHTML = '';
        //element = document.createElement('p');
        //node = document.createTextNode('Error Details :');
        //element.appendChild(node);
        //container.appendChild(element);
        //To display all errors occured on the page
        while (i < response.messages.message.length) {
            value = response.messages.message[i].code + ': ' + response.messages.message[i].text;

            //All the error messages are added to a div element
            element = document.createElement('p');
            node = document.createTextNode(value);
            element.appendChild(node);

            container.appendChild(element);
            i = i + 1;
        }

        //Display the error section
        document.getElementById('errDetails').style.display = 'block';
        msgdiv = document.getElementById('alert');
        msgdiv.classList.remove('alert-success');
        msgdiv.classList.add('alert-danger');
        msgdiv.style.display = 'block';
    } else {
        dataDescriptor.value = response.opaqueData.dataDescriptor;
        dataValue.value = response.opaqueData.dataValue;
        tokenVal = document.getElementById('dataValue').value;

        //Below function calls the web API and shows confirmation page on successful payment
        showConfirmationPage(tokenVal);
    }
}


//Send payment information on Pay button click in Accept.js page
function sendPaymentDataToAnet() {
    var isvalid = validatePaymentFields(),
        authData = {},
        sel = '',
        cardData = {},
        bankData = {},
        secureData = {};
    //if all fields are valid
    if (isvalid === 'true') {
        authData.clientKey = globalVars.ClientKey;//Value fetched from the constants.js file
        authData.apiLoginID = globalVars.ApiLoginID;//Value fetched from the constants.js file

        sel = document.querySelector('input[name="optradio"]:checked').value;

        //Based on the value selected from the radio buttons, either card or bank, the data is fetched from the form
        if (sel === 'card') {
            cardData.cardNumber = cardNo.value;
            cardData.month = expMonth.value;
            cardData.year = expYear.value;
            cardData.cardCode = cardCode.value;
        } else {
            bankData.accountNumber = accountNumber.value;
            bankData.routingNumber = routingNumber.value;
            bankData.nameOnAccount = nameOnAccount.value;
            bankData.accountType = document.querySelector('input[name="acntradio"]:checked').value;
        }
        secureData.authData = authData;
        if (sel === 'card') {
            secureData.cardData = cardData;
        } else {
            secureData.bankData = bankData;
        }
        //Sending payment data to dispatch data method which is available in accept JS plugin
        Accept.dispatchData(secureData, responseHandler);
    }
}


//Accept.js functionality End

//AcceptUI functionality implementation
function acceptUI() {

    //To set the action URL for the payment form in Accept UI section
    var form = document.getElementById('paymentForm'),
        ele = '';
    form.setAttribute('action', window.location.href.split('?')[0]);
    //Accept UI pay button has predefined attributes that are declared below.
    //To set values for accept UI Pay button
    ele = document.getElementById('btnAcceptUI');
    //Below values are fetched from the constants.js file
    ele.setAttribute('data-apiLoginID', globalVars.ApiLoginID);
    ele.setAttribute('data-clientKey', globalVars.ClientKey);
}