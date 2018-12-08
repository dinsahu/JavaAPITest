package net.authorize.webservice;
/**
 * Accept Response class is returning the response from Sample code API's based on status
 * if status is true it will return successValue.
 * if status is false it will return errorMessage.
 */
public class AcceptResponse {
	private String successValue ;
	private String errorMessage ;
	private Boolean  status = false;
	/**
	 * @return the successValue
	 */
	public String getSuccessValue() {
		return successValue;
	}
	/**
	 * @param successValue the successValue to set
	 */
	public void setSuccessValue(String successValue) {
		this.successValue = successValue;
	}
	/**
	 * @return the errorMessage
	 */
	public String getErrorMessage() {
		return errorMessage;
	}
	/**
	 * @param errorMessage the errorMessage to set
	 */
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	/**
	 * @return the status
	 */
	public Boolean getStatus() {
		return status;
	}
	/**
	 * @param status the status to set
	 */
	public void setStatus(Boolean status) {
		this.status = status;
	}
	
}
