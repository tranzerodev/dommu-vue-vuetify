@ECHO off
IF [%BRANCH-CLIENT%]==[] (
    echo Branch not set - please do manually - feature/jwt-authentication
) 

IF NOT [%BRANCH-CLIENT%]==[] (

    call git push origin %BRANCH-CLIENT%
    call git checkout master
    call git pull origin master
    call git merge %BRANCH-CLIENT%
)