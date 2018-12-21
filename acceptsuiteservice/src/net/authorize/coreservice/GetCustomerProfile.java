package net.authorize.coreservice;
import net.authorize.Environment;
import net.authorize.api.contract.v1.*;
import net.authorize.api.contract.v1.MerchantAuthenticationType;
import net.authorize.api.controller.base.ApiOperationBase;
import net.authorize.api.controller.GetCustomerProfileController;

public class GetCustomerProfile {
	
	public static ANetApiResponse run(String apiLoginId, String transactionKey, String customerProfileId) {

        ApiOperationBase.setEnvironment(Environment.SANDBOX);
        // define the merchant information (authentication / transaction id)
        MerchantAuthenticationType merchantAuthenticationType  = new MerchantAuthenticationType() ;
        merchantAuthenticationType.setName(apiLoginId);
        merchantAuthenticationType.setTransactionKey(transactionKey);
        ApiOperationBase.setMerchantAuthentication(merchantAuthenticationType);

        GetCustomerProfileRequest apiRequest = new GetCustomerProfileRequest();
        apiRequest.setCustomerProfileId(customerProfileId);

        GetCustomerProfileController controller = new GetCustomerProfileController(apiRequest);
        controller.execute();
       
		GetCustomerProfileResponse response = new GetCustomerProfileResponse();
		response = controller.getApiResponse();

		if (response!=null) {

            if (response.getMessages().getResultCode() == MessageTypeEnum.OK) {
 				System.out.println(response.getMessages().getMessage().get(0).getText());
                System.out.println(response.getProfile().getCustomerProfileId());
                              
                if ((response.getSubscriptionIds() != null) && (response.getSubscriptionIds().getSubscriptionId() != null) && 
                		(!response.getSubscriptionIds().getSubscriptionId().isEmpty())) {
                	System.out.println("List of subscriptions:");
                	for (String subscriptionid : response.getSubscriptionIds().getSubscriptionId())
                		System.out.println(subscriptionid);
                }

            } else {
            	
            	 System.out.println("Error: " + response.getMessages().getMessage().get(0).getCode() + "  " + response.getMessages().getMessage().get(0).getText());                
            }
        }
		return response;
    }
}

