#!/bin/bash
#sets the folder path
TOMCAT=C:/Automateserver/apache-tomcat
TOMCAT_WEBAPPS=$TOMCAT/webapps
TOMCAT_CONFIG=$TOMCAT/conf/server.xml
TOMCAT_START=$TOMCAT/bin/catalina.bat
TARGET=$TOMCAT_WEBAPPS/acceptsuiteservice/target
WAR_FILE=$TARGET/acceptsuiteservice-0.0.1-SNAPSHOT.war
n=$((RANDOM%50+5))

# Start build
echo "Start build"
mvn clean install -Dmaven.test.skip=true

if [ ! -r $TARGET ]; then
    echo "target file is not found inside path: $TARGET" 1>&2
	echo "Build the the coode again" 1>&2
	sleep $n
    exit 1
fi
echo "Successfully build"

# TOMCAT and TOMCAT_WEBAPPS must be writable
if [ ! -w $TOMCAT -o ! -w $TOMCAT_WEBAPPS ]; then
    echo "$TOMCAT and $TOMCAT_WEBAPPS must be writable." 1>&2
    exit 1
fi

# It is checking for WAR file.
if [ ! -r $WAR_FILE ]; then
    echo "$WAR_FILE is missing. Download it and run this again to deploy it." 1>&2
else
    cp $WAR_FILE $TOMCAT_WEBAPPS
fi

# Start tomcat server
echo "Start tomcat server "
$TOMCAT_START start
sleep $n

# Automatically opens the URL in Web Browser
start https://10.173.125.203:9444/acceptsuiteservice/index_all.html
echo "Accept Suite Application successfully launched on web browser"