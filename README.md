# Finance Manager

## MVP
* Public scraper API
* Public transaction sector identifier API (how should I tag a transaction's sector without verifying it?)
* Frontend
  * Enter providers (companies) and their credentials - credentials are saved in session cookies
  * A table of all credit card transactions
  * A table of all bank transactions
  * Table features
    * Filter: date (range), sector, supplier
    * Sort: date, name, amount
    * Refresh button
    

## V1
* Authentication + encryption key generated
* Credentials are encrypted and stored in local storage
* Statistics for credit card transactions
* Statistics for bank transactions
* Statistics features
  * Filter: date (specific month)
  * Pie chart of expenses per sector
  * Income vs expenses
  * Comparison: up to 3 months compared to each other (same statistics, with a diff summary in the bottom)
 
 ## Other
* Pulumi
* Tests
* Better authentication (auth0? Oauth2? MFA?)
* Marketial website
* Transfer credentials from one device to another using WebRTC or similar peer-to-peer tech
* Alerts
* PWA with periodic sync to refresh data and possibly push alerts - https://whatwebcando.today/scheduler.html & https://developers.google.com/web/fundamentals/push-notifications 

docker run -p 5432:5432 --name postgres -e POSTGRES_PASSWORD=postgres -d postgres  
docker run -p 4000:80 -e PGADMIN_DEFAULT_EMAIL=postgres -e PGADMIN_DEFAULT_PASSWORD=postgres -d dpage/pgadmin4
