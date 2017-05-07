# Car Wash - Code Challenge

## Challenge Requirements
You are running a car wash. Here are the rules:
 
- You must use Node JS.
- Your car wash accepts cars and trucks.
- You charge $5 for cars.
- You charge $10 for trucks.
- Your car wash charges $2 extra if the truck has mud in the bed.
- Your car wash does not accept trucks with the bed let down.
- If the vehicle comes in a second time, they get 50% off.
- If the license plate equals 1111111, the vehicle is stolen and does not get a car wash.
 
Store a transaction history of at least 10 vehicles.


## Installation
1. Clone the Repo
1. Create empty mysql database `jonathan_lee_car_wash`
1. Install dependencies: `npm install`
1. Run migrations: `npm run migrate-up`


## Running the Car Wash Script
1. `npm start`
1. follow prompts

## Notes
- In the interest of time, I had to use two different `mysql` libraries.
  - `promise-mysql` was used for the running code
  - `mysql2` (callback-based) was needed for the migrations since it seemed that the `migrate` module didn't seem to like `promise-mysql`

- There is a lack of configuration ability. The user who wants to use their own MySQL database config (host/port/user/etc) would need to change the following two files:
  - `car_wash/helper/migration/index.js`
  - `car_wash/mysql/index.js`
