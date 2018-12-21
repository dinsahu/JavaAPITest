package net.authorize.webservice;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import net.authorize.api.contract.v1.ANetApiResponse;
import net.authorize.api.contract.v1.MessageTypeEnum;
import net.authorize.coreservice.CreateAnAcceptPaymentTransaction;
import net.authorize.coreservice.GetAcceptCustomerProfilePage;
import net.authorize.coreservice.GetCustomerProfile;
import net.authorize.coreservice.GetAnAcceptPaymentPage;

@Path("/api")
public class AcceptSuiteService {
	/**
	 * Use this function to create an Authorize.Net payment transaction request, 
	 * using the Accept Payment Once / token in place of card data
	 * @param apiLoginId
	 * @param apiTransactionKey
	 * @param token
	 * @return AcceptResponse object
	 */
	@GET
	@Path("/acceptjs")
	@Produces({ MediaType.APPLICATION_JSON })

	public AcceptResponse createAcceptPaymentTransaction(@QueryParam("apiLoginId") String apiLoginId,
			@QueryParam("apiTransactionKey") String apiTransactionKey, @QueryParam("token") String token) {
		AcceptResponse objAcceptResponse = new AcceptResponse();
		try {
			
			//creates a transaction by calling the sample code API
			ANetApiResponse profileResponse = CreateAnAcceptPaymentTransaction.run(apiLoginId, apiTransactionKey,
					token);
			if (profileResponse != null) {
				if (profileResponse.getMessages() != null
						&& profileResponse.getMessages().getResultCode() == MessageTypeEnum.OK) {
					objAcceptResponse.setSuccessValue(((net.authorize.api.contract.v1.CreateTransactionResponse) profileResponse)
							.getTransactionResponse().getTransId());
					objAcceptResponse.setStatus(true);
				} else {
					if (profileResponse.getMessages() != null
							&& profileResponse.getMessages().getResultCode().toString().toLowerCase() == "error") {
						objAcceptResponse.setErrorMessage(profileResponse.getMessages().getMessage().get(0).getCode()
								+ " " + profileResponse.getMessages().getMessage().get(0).getText());
					}
					else {
						objAcceptResponse.setErrorMessage(((net.authorize.api.contract.v1.CreateTransactionResponse) profileResponse)
								.getTransactionResponse().getErrors().getError().get(0).getErrorCode()
								+ ((net.authorize.api.contract.v1.CreateTransactionResponse) profileResponse)
								.getTransactionResponse().getErrors().getError().get(0).getErrorText());
					}
				}

			} else {
				objAcceptResponse.setErrorMessage("Error occured while executing payment, retrieved null response. ");
			}
		} catch (Exception e) {
			objAcceptResponse.setErrorMessage("Error occured while executing payment. " + e.getMessage());
		}
		return objAcceptResponse;
	}

	/**
	 * Use this function to validate an existing customer profile
	 * @param apiLoginId
	 * @param apiTransactionKey
	 * @param customerId
	 * @return AcceptResponse object
	 */
	@GET
	@Path("/validatecustomer")
	@Produces({ MediaType.APPLICATION_JSON })

	public AcceptResponse validateExistingCustomerProfile(@QueryParam("apiLoginId") String apiLoginId,
			@QueryParam("apiTransactionKey") String apiTransactionKey, @QueryParam("customerId") String customerId) {
		AcceptResponse objAcceptResponse = new AcceptResponse();
		try {
			
			// validates customer by calling the sample code API
			ANetApiResponse response = GetCustomerProfile.run(apiLoginId, apiTransactionKey, customerId);
			if (response != null) {
				if (response.getMessages() != null && response.getMessages().getResultCode() == MessageTypeEnum.OK) {
					objAcceptResponse.setSuccessValue(response.getMessages().getMessage().get(0).getCode() + " "
							+ response.getMessages().getMessage().get(0).getText());
					objAcceptResponse.setStatus(true);
				} else {
					objAcceptResponse.setErrorMessage("Error: " + response.getMessages().getMessage().get(0).getCode()
							+ "  " + response.getMessages().getMessage().get(0).getText());
				}
			} else {
				objAcceptResponse.setErrorMessage("Error occured while executing payment, retrieved null response.");
			}
		} catch (Exception e) {
			objAcceptResponse.setErrorMessage("Error . " + e.getMessage());
		}

		return objAcceptResponse;
	}

	/**
	 * Use this function to retrieve a form token which can be used to request the Authorize.Net Accept hosted payment page
	 * @param apiLoginId
	 * @param apiTransactionKey
	 * @param iFrameCommunicatorUrl
	 * @param customerProfileId
	 * @return AcceptResponse object
	 */
	@GET
	@Path("/accepthosted")
	@Produces({ MediaType.APPLICATION_JSON })

	public AcceptResponse retrieveAcceptHostedFormToken(@QueryParam("apiLoginId") String apiLoginId,
			@QueryParam("apiTransactionKey") String apiTransactionKey,
			@QueryParam("iFrameCommunicatorUrl") String iFrameCommunicatorUrl,
			@QueryParam("customerId") String customerId) {
		
		System.out.println("customerId1="+customerId );
		AcceptResponse objAcceptResponse = new AcceptResponse();
		try {
			
			// retrieve a form token which can be used to request the Authorize.Net Accept hosted payment page
			ANetApiResponse response = GetAnAcceptPaymentPage.run(apiLoginId, apiTransactionKey, iFrameCommunicatorUrl,
					customerId);
			if (response != null) {
				if (response.getMessages() != null && response.getMessages().getResultCode() == MessageTypeEnum.OK) {
					objAcceptResponse.setSuccessValue(((net.authorize.api.contract.v1.GetHostedPaymentPageResponse) response)
							.getToken());
					objAcceptResponse.setStatus(true);
				} else {
					objAcceptResponse.setErrorMessage("Failed to get hosted payment page Error: "
							+ response.getMessages().getMessage().get(0).getCode() + "  "
							+ response.getMessages().getMessage().get(0).getText());
				}

			} else {
				objAcceptResponse.setErrorMessage("Error occured while executing payment, retrieved null response. ");
			}
		} catch (Exception e) {
			objAcceptResponse.setErrorMessage("Error occured while executing payment. " + e.getMessage());
		}
		return objAcceptResponse;
	}

	/**
	 * Use this function to retrieve a form token which can be used to request the Authorize.Net Customer Profile Page
	 * @param apiLoginId
	 * @param apiTransactionKey
	 * @param customerId
	 * @param iFrameCommunicatorUrl
	 * @return AcceptResponse object
	 */
	@GET
	@Path("/acceptcustomer")
	@Produces({ MediaType.APPLICATION_JSON })

	public AcceptResponse retrieveCustomerProfilePageFormToken(@QueryParam("apiLoginId") String apiLoginId,
			@QueryParam("apiTransactionKey") String apiTransactionKey, @QueryParam("customerId") String customerId,
			@QueryParam("iFrameCommunicatorUrl") String iFrameCommunicatorUrl) {
		AcceptResponse objAcceptResponse = new AcceptResponse();
		try {
			
			// generates a token by calling the sample code API
			ANetApiResponse response = GetAcceptCustomerProfilePage.run(apiLoginId, apiTransactionKey, customerId,
					iFrameCommunicatorUrl);
			if (response != null) {
				if (response.getMessages() != null && response.getMessages().getResultCode() == MessageTypeEnum.OK) {
					objAcceptResponse.setSuccessValue(((net.authorize.api.contract.v1.GetHostedProfilePageResponse) response)
							.getToken());
					objAcceptResponse.setStatus(true);
				} else {
					objAcceptResponse.setErrorMessage("Failed to get hosted payment page Error: "
							+ response.getMessages().getMessage().get(0).getCode() + "  "
							+ response.getMessages().getMessage().get(0).getText());
				}
			} else {
				objAcceptResponse.setErrorMessage("Error occured while executing payment, retrieved null response. ");
			}
		} catch (Exception e) {
			objAcceptResponse.setErrorMessage("Error occured while executing payment. " + e.getMessage());
		}
		return objAcceptResponse;
	}
}
