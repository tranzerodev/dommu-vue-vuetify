#!/bin/bash
# TODO deal with first tiem regestration of golang service and pm2
# TODO: combine this into deploy-demo.sh and make it support the environment filenames

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
    cd ~/casafi/production
    echo "Checking for payload files with datetimestamp: $datetimeStamp"
    if [[ -f "client-$datetimeStamp.zip" ]]; then  
        echo "Found expected payload file";
    else
        echo "A required payload file is missing. Expecting:";
        echo -e "\t./client-$datetimeStamp.zip"
        exit 1;
    fi
}

# Begin deploy script if all parameters are correct and files are present
deploy(){

    # TODO: check its the right server and remove from LB
    echo "Deploying payload files on server"

    systemctl stop nginx.service
    rm -rf /var/www/casafi6.firmview.co.uk/*
    unzip -oqq ~/casafi/production/client-$datetimeStamp.zip   -d /var/www/casafi6.firmview.co.uk
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

