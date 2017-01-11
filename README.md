[![Travis](https://img.shields.io/travis/tscholzdatameer/sharelost.svg?maxAge=2592000&style=flat-square)](https://travis-ci.org/tscholzdatameer/sharelost)

This application is based on
* gradle
* spark
* 
* hibernate
* react
* webpack

This application is intended to be a SPA.


* setup and compile application by
./gradlew clean eclipse build startSpark

* start application by
java -jar build/libs/sharelost-0.1.0.jar

* use application by
http://localhost:4567/hello


* setup UI
`npm install`

* start UI development server
`npm run dev`

* use application
`http://localhost:4567`

* development login
`admin : admin`

Information of Engineers
==============================
* review configuration
http://localhost:8083/env/
http://localhost:8083/autoconfig/


* review database entries
http://localhost:8083/h2/
-> change JDBC URL to: jdbc:h2:file:./build/sharelost;MODE=MySQL;DB_CLOSE_DELAY=-1
-> remove the user name 'sa'
