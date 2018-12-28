#!/bin/bash
#Sets the folder path
TOMCAT=$(jq -r '.TOMCAT' userInputs.json)
PORT=$(jq -r '.PORT' userInputs.json)
IP_ADDRESS=$(jq -r '.IP_ADDRESS' userInputs.json)
TOMCAT_WEBAPPS=$TOMCAT/webapps
TOMCAT_CONFIG=$TOMCAT/conf/server.xml
TOMCAT_START=$TOMCAT/bin/catalina.bat
BUILD=$TOMCAT_WEBAPPS/acceptsuiteservice
WAR_FILE=$BUILD/target/acceptsuite-service.war
n=$((RANDOM%50+5))

# Start build
cd $BUILD
mvn clean install -Dmaven.test.skip=true
STATUS=$?
if [ $STATUS -eq 0 ]; then
echo "Build Successful." 1>&2
else
echo "Build Failed." 1>&2
$n
exit 1
fi

# TOMCAT and TOMCAT_WEBAPPS must be writable
if [ ! -w $TOMCAT -o ! -w $TOMCAT_WEBAPPS ]; then
    echo "$TOMCAT and $TOMCAT_WEBAPPS must be writable." 1>&2
    $n
	exit 1
fi

# It is checking for WAR file.
if [ ! -r $WAR_FILE ]; then
    echo "$WAR_FILE is missing. Download it and run this again to deploy it." 1>&2
	$n
	exit 1
else
    cp $WAR_FILE $TOMCAT_WEBAPPS
fi

# Start tomcat server
echo "Start tomcat server"
$TOMCAT_START start
sleep $n

# Automatically Launching the Accept Suite Application on web browser.
start https://$IP_ADDRESS:$PORT/acceptsuite-service/index_all.html
echo "Accept Suite Application successfully launched on web browser"