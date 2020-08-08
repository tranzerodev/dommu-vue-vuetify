#!/bin/bash
# TODO deal with first tiem regestration of golang service and pm2

# TODO: combine this into deploy-generic.sh and make it
# support the environments and server names passed in as a params

target_env="live"
site="domun"
sitename="domun.co.uk"

# will need regestration of new production service.
displayVersion()
{
   echo "1.16"
   exit 1 # Exit script after printing verion
}

displayHelp()
{
   echo ""
   echo "Auto Deployer 1.14, a non interactive deploy file that takes a date timestamp and deploys expected zip files."
   echo "Usage: deploy [OPTION]"
   echo ""
   echo "Mandatory arguments:"
   echo -e "\t-d,            datetime stamp in format 20190519-222405"
   echo ""
   echo "Optional arguments:"
   echo -e "\t-v,            display the version of deploy script and exit."
   echo -e "\t-h,            print this help."
   echo ""
   exit 1 # Exit script after printing help
}

valiadate(){

    # Print help message if required parameters are empty
    #if [ -z "$datetimeStamp" ] || [ -z "$help" ] || [ -z "$version" ]
    if [ -z "$datetimeStamp" ]
    then
    echo "Required datetimeStamp parameter is missing";
    displayHelp
    fi

    # check the files exist
    cd ~/$site/production
    echo "Checking for payload files with datetimestamp: $datetimeStamp"
    if [[ -f "$site-production-client-$datetimeStamp.zip" ]]; then
        echo "Found expected payload file";
    else
        echo "A required payload file is missing. Expecting:";
        echo -e "\t./$site-production-client-$datetimeStamp.zip"
        exit 1;
    fi
}

# Begin deploy script if all parameters are correct and files are present
deploy(){

    # TODO: check its the right server and remove from LB
    echo "Deploying $site payload files on server to /var/www/$sitename"

    systemctl stop nginx.service
    rm -rf /var/www/$sitename/*
    unzip -oqq ~/$site/production/$site-production-client-$datetimeStamp.zip   -d /var/www/$sitename
    systemctl start nginx.service
    cd ~
}

# set the options
while getopts "d:v:h:" opt
do
   case "$opt" in
      d ) datetimeStamp="$OPTARG" ;;
      v ) version="true" ;;
      h ) help="true" ;;
      ? ) displayHelp ;; # Print helpFunction in case parameter is non-existent
   esac
done

# check the params are present and the expected files are present
valiadate

#deploy the code
deploy
