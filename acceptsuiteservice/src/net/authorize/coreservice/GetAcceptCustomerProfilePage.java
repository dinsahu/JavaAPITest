package net.authorize.coreservice;
import net.authorize.Environment;
import net.authorize.api.contract.v1.*;
import net.authorize.api.contract.v1.MerchantAuthenticationType;
import net.authorize.api.controller.base.ApiOperationBase;
import net.authorize.api.controller.GetHostedProfilePageController;

public class GetAcceptCustomerProfilePage {
	
	public static ANetApiResponse run(String apiLoginId, String transactionKey, String customerProfileId,String hostedPaymentIFrameCommunicatorUrl) {

        ApiOperationBase.setEnvironment(Environment.SANDBOX);
        // define the merchant information (authentication / transaction id)
        MerchantAuthenticationType merchantAuthenticationType  = new MerchantAuthenticationType() ;
        merchantAuthenticationType.setName(apiLoginId);
        merchantAuthenticationType.setTransactionKey(transactionKey);
        ApiOperationBase.setMerchantAuthentication(merchantAuthenticationType);
         
        //IFrameCommunicator is used for accept customer
        //The URL of the iFrameCommunicator page is passed in settings, which will allow Authorize.Net to embed the communicator page in the payment form
        SettingType setting1 = new SettingType();
        setting1.setSettingName("hostedProfileReturnUrl");
        setting1.setSettingValue("https://returnurl.com/return/");
        
        SettingType setting2 = new SettingType();
        setting2.setSettingName("hostedProfileIFrameCommunicatorUrl");
        setting2.setSettingValue(hostedPaymentIFrameCommunicatorUrl);
        
        ArrayOfSetting alist = new ArrayOfSetting();
        alist.getSetting().add(setting1);
        alist.getSetting().add(setting2);
        
        GetHostedProfilePageRequest apiRequest = new GetHostedProfilePageRequest();
        apiRequest.setCustomerProfileId(customerProfileId);
        apiRequest.setHostedProfileSettings(alist);

        GetHostedProfilePageController controller = new GetHostedProfilePageController(apiRequest);
        controller.execute();
       
		GetHostedProfilePageResponse response = new GetHostedProfilePageResponse();
		response = controller.getApiResponse();

		if (response!=null) {

             if (response.getMessages().getResultCode() == MessageTypeEnum.OK) {

 				System.out.println(response.getMessages().getMessage().get(0).getCode());
                System.out.println(response.getMessages().getMessage().get(0).getText());
                System.out.println(response.getToken());
            }
            else
            {
                System.out.println("Failed to get hosted profile page:  " + response.getMessages().getMessage().get(0).getCode() + " " +response.getMessages().getMessage().get(0).getText());  
            }
        }
		return response;
    }
}
