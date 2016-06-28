[![Travis](https://img.shields.io/travis/tscholzdatameer/sharelost.svg?maxAge=2592000&style=flat-square)](https://travis-ci.org/tscholzdatameer/sharelost)

This application is based on
* gradle
* spring boot

This application is intended to be a SPA.


* setup and compile application by
./gradlew clean eclipse build

* start application by
java -jar build/libs/sharelost-0.1.0.jar

* use application by
http://localhost:8083/
http://localhost:8083/users/

Information of Engineers
==============================
* review configuration
http://localhost:8083/env/
http://localhost:8083/autoconfig/

* review DB schema
http://localhost:8083/profile/users

* review JSON HAL
http://localhost:8083/browser/
-> in text field explorer enter e.g., /users and click Go!

* query database:
http://localhost:8083/users/search/findByName?name=Daniel
http://localhost:8083/users/search/findByName?name=Jörg
http://localhost:8083/users/search/existsAtAll

* query database with paging & sorting
http://localhost:8083/users?page=1&size=2
http://localhost:8083/users?page=2&size=2&sort=name,asc
http://localhost:8083/users?page=2&size=2&sort=name,desc


* review database entries
http://localhost:8083/h2/
-> change JDBC URL to: jdbc:h2:file:./build/sharelost;MODE=MySQL;DB_CLOSE_DELAY=-1
-> remove the user name 'sa'


* review runtime metrics
http://localhost:8083/metrics/
