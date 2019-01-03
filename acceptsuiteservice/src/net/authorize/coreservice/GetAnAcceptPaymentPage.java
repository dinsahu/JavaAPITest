package net.authorize.coreservice;
import java.math.BigDecimal;
import java.math.RoundingMode;
import net.authorize.Environment;
import net.authorize.api.contract.v1.*;
import net.authorize.api.controller.base.ApiOperationBase;
import net.authorize.api.controller.GetHostedPaymentPageController;

public class GetAnAcceptPaymentPage {	

	public static ANetApiResponse run(String apiLoginId, String transactionKey, String hostedPaymentIFrameCommunicatorUrl,String customerProfileId) {
	    
		ApiOperationBase.setEnvironment(Environment.SANDBOX);
        // define the merchant information (authentication / transaction id)
        MerchantAuthenticationType merchantAuthenticationType  = new MerchantAuthenticationType() ;
        merchantAuthenticationType.setName(apiLoginId);
        merchantAuthenticationType.setTransactionKey(transactionKey);
        ApiOperationBase.setMerchantAuthentication(merchantAuthenticationType);
        
        TransactionRequestType txnRequest = new TransactionRequestType();
        txnRequest.setTransactionType(TransactionTypeEnum.AUTH_CAPTURE_TRANSACTION.value());
        txnRequest.setAmount(new BigDecimal("99").setScale(2, RoundingMode.CEILING));
        if (!customerProfileId.isEmpty()){
        	CustomerProfilePaymentType custprofile = new CustomerProfilePaymentType();
            custprofile.setCustomerProfileId(customerProfileId);
            txnRequest.setProfile(custprofile);
          }
        
        //IFrameCommunicator is used for accept hosted
        //The URL of the iFrameCommunicator page is passed in hosted settings, which will allow Authorize.Net to embed the communicator page in the payment form
        SettingType setting1 = new SettingType();
        setting1.setSettingName("hostedPaymentButtonOptions");
        setting1.setSettingValue("{\"text\": \"Pay\"}");
        
        SettingType setting2 = new SettingType();
        setting2.setSettingName("hostedPaymentOrderOptions");
        setting2.setSettingValue("{\"show\": false}");
        
        SettingType setting3 = new SettingType();
        setting3.setSettingName("hostedPaymentIFrameCommunicatorUrl");
        setting3.setSettingValue("{\"url\": \""+ hostedPaymentIFrameCommunicatorUrl +"\"}");
         
        SettingType setting4 = new SettingType();
        setting4.setSettingName("hostedPaymentBillingAddressOptions");
        setting4.setSettingValue("{\"show\": false}");
        
        SettingType setting5 = new SettingType();
        setting5.setSettingName("hostedPaymentReturnOptions");
        setting5.setSettingValue("{\"showReceipt\": false,\"url\":\"" + hostedPaymentIFrameCommunicatorUrl + "\",\"urlText\":\"Continue\",\"cancelUrlText\":\"Cancel\"}");

        ArrayOfSetting alist = new ArrayOfSetting();
        alist.getSetting().add(setting1);
        alist.getSetting().add(setting2);
        alist.getSetting().add(setting3);
        alist.getSetting().add(setting4);
        alist.getSetting().add(setting5);
               
        GetHostedPaymentPageRequest apiRequest = new GetHostedPaymentPageRequest();
        apiRequest.setTransactionRequest(txnRequest);
        apiRequest.setHostedPaymentSettings(alist);

        GetHostedPaymentPageController controller = new GetHostedPaymentPageController(apiRequest);
        controller.execute();
       
        GetHostedPaymentPageResponse response = new GetHostedPaymentPageResponse();
		response = controller.getApiResponse();

		if (response!=null) {

             if (response.getMessages().getResultCode() == MessageTypeEnum.OK) {
 				System.out.println("Message code : " +response.getMessages().getMessage().get(0).getCode());
                System.out.println("Message text : " +response.getMessages().getMessage().get(0).getText());
                System.out.println("Token : " +response.getToken());                
            }
            else
            {
            	System.out.println("Error: " + response.getMessages().getResultCode() + " "+ response.getMessages().getMessage().get(0).getText());
                System.out.println("Failed to get hosted payment page");
            }
        }
		return response;
    }
}
