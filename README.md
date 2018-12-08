# Accept Suite Integration with Java Web Service API

## Very detailed explanation of each product type.

Authorized.Net Accept suite has below products.
*	Accept JS
*	Accept UI
*	Accept Hosted
*	Accept Customer

Detailed explanation of each product are available in the below links.
https://developer.authorize.net/api/reference/features/accept.html
https://developer.authorize.net/api/reference/features/acceptjs.html
https://developer.authorize.net/api/reference/features/accept_hosted.html
https://developer.authorize.net/api/reference/features/customer_profiles.html#Using_the_Accept_Customer_Hosted_Form

## Two ways to deploy Accept Suite .Net Application

## [Manual Deployment](https://github.com/dinsahu/AcceptSuit-Java#step-by-step-guide-for-manual-deployment)

## Step by Step Guide for Manual Deployment:

## Prerequisite:
*	Windows 10 Professional.
*	JDK 1.8 or higher version
*	Eclipse Oxygen IDE or any editor of your choice.
*	Apache Tomcat7.0 Server or higher version.

## Steps to download the code from the repository:

* Click on Clone or Download button from the repository.

* Popup Displays 2 Options Open in Desktop or Download ZIP

![Image of CloneorDownloadButton](Github-Images/CloneorDownloadButton.PNG)

* Click on Download ZIP and choose the folder C:\GithubLocal to save.

![Image of DownloadToGitHubFolder](Github-Images/DownloadToGitHubFolder.PNG)

* UnZip the folder accept-sample-app-java-master.zip

* Once UnZipped , accept-sample-app-java-master Folder contains css, js , HTML files along with few folders.

![Image of FolderStructure](Github-Images/FolderStructure.PNG)

## Creation of Web Dynamic Project using Eclipse IDE for UI

* Open Eclipse IDE and Create a web dynamic project name as AcceptScript.

![Image of NewProjectUI](Github-Images/NewProjectUI.PNG)

* Copy all the files and folders from accept-sample-app-java-master folder except AcceptSuite-JavaWebService-API folder and paste it in WebContent Folder of created web dynamic project.

![Image of UIWebContent](Github-Images/UIWebContent.PNG)

* Open the folder **AcceptSuite-JavaWebService-API**

* [Detailed steps are explained on how to deploy on Apache Tomcat Server.](https://github.com/dinsahu/AcceptSuit-Java/tree/master/AcceptSuite-JavaWebService-API#deploy-java-web-service-api-application-to-apache-tomcat-server)

* Once deployed Successfully , update the URL's in Constants.js file as described below.

* **Constants.js file contains Keys which is used globally across the application.**

## API URL's Section:

The URLs should be provided with static port number in the following format.

**https://localhost:9443/AcceptSuite/api/ApiMethodName **

* ** ApiMethodName ** parameter is dynamic and that need to be replaced with Product Type name 
detailed description is explained below.

* AcceptJSRequestUrl/AcceptUI.JS RequestUrl : URL to invoke Accept JS web service.

	**Sample URL: https://localhost:9443/Acceptsuite/api/AcceptJS**


* AcceptHostedRequestUrl : URL to get the token value for Accept Hosted.

	**Sample URL: https://localhost:9443/AcceptSuite/api/AcceptHosted**


* AcceptCustomerRequestUrl : URL to get the token value for Accept Customer.

	**Sample URL: https://localhost:9443/AcceptSuite/api/AcceptCustomer**


* ValidateCustomerRequestUrl : URL to invoke a web api method to validate customer ID.

	**Sample URL: https://IPAddress:9443/AcceptSuite/api/ValidateCustomer**

## Merchant Authentication Details: 

The following are the parameters with values that remains constant throughout the application. These parameters are used in script through Ajax calls for performing payments.

* ClientKey 

![Image of clientKey](Github-Images/clientKey.PNG)

* ApiLoginID

![Image of apiLogin](Github-Images/apiLogin.PNG)

* ApiTransactionKey

![Image of apiTransactionKey](Github-Images/apiTransactionKey.PNG)


### Create Website on Apache Tomcat Server

*	Open Server window
*	New > Server
*	Select Tomcat v7.0 Server
*	Select Server runtime environment. Press add

	![Add-Website](Github-Images/Add-Website-Apache.png)
	
*	Select the folder where you extracted the server files that you have downloaded

	![Add-Website](Github-Images/Add-Website-Server.png)
	
## browse the website

Sample URL: https://10.173.125.203:9443/AcceptScript/index_all.html

![Image of dashboard](Github-Images/dashboard.PNG)