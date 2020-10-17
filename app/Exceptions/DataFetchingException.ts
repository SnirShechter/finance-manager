import { Exception } from '@poppinss/utils'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@poppinss/utils` allows defining
| a status code and error code for every exception.
|
| @example
| new DataFetchingException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class DataFetchingException extends Exception {
  constructor(
    message = 'An error has occurred while trying to fetch the data, please try again later.',
    code = 500,
    errorCode = 'E_DATA_FETCH_EXCEPTION'
  ) {
    super(message, code, errorCode)
  }
}
