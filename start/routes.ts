/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('/register', 'AuthController.register')
  Route.post('/login', 'AuthController.login')
  Route.post('/logout', 'AuthController.logout')
}).prefix('auth')

Route.group(() => {
  Route.post('/hapoalim', 'FinancialDataController.hapoalim')
  Route.post('/beinleumi', 'FinancialDataController.beinleumi')
  Route.post('/union', 'FinancialDataController.union')
  Route.post('/amex', 'FinancialDataController.amex')
  Route.post('/isracard', 'FinancialDataController.isracard')
  Route.post('/visaCal', 'FinancialDataController.visaCal')
  Route.post('/max', 'FinancialDataController.max')
  Route.post('/otsarHahayal', 'FinancialDataController.otsarHahayal')
  Route.post('/discount', 'FinancialDataController.discount')
  Route.post('/mizrahi', 'FinancialDataController.mizrahi')
  Route.post('/leumi', 'FinancialDataController.leumi')
}).prefix('data')
