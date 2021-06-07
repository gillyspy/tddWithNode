
Journal
=======

### 2021-06-07
#### http-server
using http-server to simulate the webservice running on a different machine / port than the backend service
e.g. command line
```
npx http-server -c-1 -p 8080 -P http://localhost:3030
``` 

From the http-server docs:
>-c Set cache time (in seconds) for cache-control max-age header, e.g. -c10 for 10 seconds (defaults to 3600). To disable caching, use -c-1.
>
>-U or --utc Use UTC time format in log messages.
>
>--log-ip Enable logging of the client's IP address (default: false).
>
>-P or --proxy Proxies all requests which can't be resolved locally to the given url. e.g.: -P

#### git
using git on the `source` folder only

the simple "website" is not in source as that is mostly a stub... as-if someone else had responsibility to build it and 
we are abstracting our implementation from being so tightly coupled.

### tdd
red-green-refactor pattern  

### nodemon & jest
was getting an error in running jest at same time as nodemon (app).  
moved app.listen out of app root to avoid conflict

