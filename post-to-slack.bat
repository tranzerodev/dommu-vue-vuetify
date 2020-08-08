@ECHO off
setlocal 
set message=%1
set message=%message:"=%
IF [%1]==[] (
    ECHO "Parameter Missing - needs a message"
) ELSE (       
    CALL curl -X POST -H "Content-type: application/json" --data "{'text':'%message%'}" https://hooks.slack.com/services/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
)