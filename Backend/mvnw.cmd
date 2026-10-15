@echo off
set "DIR=%~dp0"
if exist "C:\Program Files\Java\jdk-22" (
    set "JAVA_HOME=C:\Program Files\Java\jdk-22"
    set "PATH=C:\Program Files\Java\jdk-22\bin;%PATH%"
)
"%DIR%.maven\apache-maven-3.9.6\bin\mvn.cmd" %*
