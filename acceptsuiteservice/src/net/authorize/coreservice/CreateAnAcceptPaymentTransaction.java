package net.authorize.coreservice;
import java.math.BigDecimal;
import net.authorize.Environment;
import net.authorize.api.contract.v1.ANetApiResponse;
import net.authorize.api.contract.v1.ArrayOfLineItem;
import net.authorize.api.contract.v1.CreateTransactionRequest;
import net.authorize.api.contract.v1.CreateTransactionResponse;
import net.authorize.api.contract.v1.CustomerAddressType;
import net.authorize.api.contract.v1.LineItemType;
import net.authorize.api.contract.v1.OpaqueDataType;
import net.authorize.api.contract.v1.MerchantAuthenticationType;
import net.authorize.api.contract.v1.MessageTypeEnum;
import net.authorize.api.contract.v1.PaymentType;
import net.authorize.api.contract.v1.TransactionRequestType;
import net.authorize.api.contract.v1.TransactionResponse;
import net.authorize.api.contract.v1.TransactionTypeEnum;
import net.authorize.api.controller.CreateTransactionController;
import net.authorize.api.controller.base.ApiOperationBase;

public class CreateAnAcceptPaymentTransaction {
	
	public static ANetApiResponse run(String apiLoginId, String transactionKey, String token) {

		ApiOperationBase.setEnvironment(Environment.SANDBOX);
		// define the merchant information (authentication / transaction id)
		MerchantAuthenticationType merchantAuthenticationType  = new MerchantAuthenticationType() ;
		merchantAuthenticationType.setName(apiLoginId);
		merchantAuthenticationType.setTransactionKey(transactionKey);
		ApiOperationBase.setMerchantAuthentication(merchantAuthenticationType);

		CustomerAddressType billingAddress=new CustomerAddressType();
		billingAddress.setFirstName("John");
		billingAddress.setLastName("Doe");
		billingAddress.setAddress("123 My St");
		billingAddress.setCity("OurTown");
		billingAddress.setZip("98004");

		// Add line Items
		LineItemType lineItem1= new LineItemType();
		lineItem1.setItemId("1");
		lineItem1.setName("t-shirt");
		lineItem1.setQuantity(new BigDecimal("2"));
		lineItem1.setUnitPrice(new BigDecimal("15.00"));

		LineItemType lineItem2= new LineItemType();
		lineItem2.setItemId("2");
		lineItem2.setName("snowboard");
		lineItem2.setQuantity(new BigDecimal("1"));
		lineItem2.setUnitPrice(new BigDecimal("450.00"));

		ArrayOfLineItem  alist=new ArrayOfLineItem();
		alist.getLineItem().add(lineItem1);
		alist.getLineItem().add(lineItem2); 

		// Populate the payment data
		PaymentType paymentType = new PaymentType();
		OpaqueDataType OpaqueData = new OpaqueDataType();
		OpaqueData.setDataDescriptor("COMMON.ACCEPT.INAPP.PAYMENT");
		OpaqueData.setDataValue(token);
		paymentType.setOpaqueData(OpaqueData);

		// Create the payment transaction request
		TransactionRequestType txnRequest = new TransactionRequestType();
		txnRequest.setTransactionType(TransactionTypeEnum.AUTH_CAPTURE_TRANSACTION.value());
		txnRequest.setPayment(paymentType);   
		txnRequest.setAmount(new BigDecimal("99"));
		txnRequest.setBillTo(billingAddress);
		txnRequest.setLineItems(alist);

		// Make the API Request
		CreateTransactionRequest apiRequest = new CreateTransactionRequest();
		apiRequest.setTransactionRequest(txnRequest);
		CreateTransactionController controller = new CreateTransactionController(apiRequest);
		controller.execute();
        
		CreateTransactionResponse response = controller.getApiResponse();

		if (response!=null) {
			// If API Response is ok, go ahead and check the transaction response
			if (response.getMessages().getResultCode() == MessageTypeEnum.OK) {
				TransactionResponse result = response.getTransactionResponse();
				if (result.getMessages() != null) {
					System.out.println("Successfully created transaction with Transaction ID: " + result.getTransId());
					System.out.println("Response Code: " + result.getResponseCode());
					System.out.println("Message Code: " + result.getMessages().getMessage().get(0).getCode());
					System.out.println("Description: " + result.getMessages().getMessage().get(0).getDescription());
					System.out.println("Auth Code: " + result.getAuthCode());
				}
				else {
					System.out.println("Failed Transaction.");
					if (response.getTransactionResponse().getErrors() != null) {
						System.out.println("Error Code: " + response.getTransactionResponse().getErrors().getError().get(0).getErrorCode());
						System.out.println("Error message: " + response.getTransactionResponse().getErrors().getError().get(0).getErrorText());
					}
				}
			}
			else {
				System.out.println("Failed Transaction.");
				if (response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null) {
					System.out.println("Error Code: " + response.getTransactionResponse().getErrors().getError().get(0).getErrorCode());
					System.out.println("Error message: " + response.getTransactionResponse().getErrors().getError().get(0).getErrorText());
				}
				else {
					System.out.println("Error Code: " + response.getMessages().getMessage().get(0).getCode());
					System.out.println("Error message: " + response.getMessages().getMessage().get(0).getText());
				}
			}
		}
		else {
			System.out.println("Null Response.");
		}

		return response;
	}
}
