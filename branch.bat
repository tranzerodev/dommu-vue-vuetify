@ECHO off
IF [%1]==[] (
    echo Parameter Missing - needs a comment
)
IF [%2]==[] (
    echo Parameter Missing - needs a branch, feature/jwt-authentication
) 
IF NOT [%1]==[] IF NOT [%2]==[] (
    SET BRANCH-CLIENT=%2
    call git checkout -b %BRANCH-CLIENT%
    call git add .
    call git commit -m %1
)