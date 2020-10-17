import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('password', (value, _, { pointer, arrayExpressionPointer, errorReporter }) => {
  const specialCharacters = '~!@#$%^&*()\\-=_+\\\\\\[\\]{}/?,.<>'
  /**
   * Skip validation when value is not a string. The string
   * schema rule will handle it
   */
  if (typeof (value) !== 'string') {
    return
  }

  const containsLetters = /[a-zA-Z]+/
  const containsDigits = /[0-9]+/
  const containsSpecialCharacters = new RegExp(`[${specialCharacters}]+`)
  const containsOnlyAllowedCharacters = new RegExp(`^[0-9a-zA-Z${specialCharacters}]+$`)

  if(!containsLetters.test(value)) {
    errorReporter.report(pointer, 'password',
      'Password must contain at least one english letter (a-z or A-Z)', arrayExpressionPointer)
  } else if(!containsDigits.test(value)) {
    errorReporter.report(pointer, 'password', 'Password must contain at least one digit (0-9)', arrayExpressionPointer)
  } else if(!containsSpecialCharacters.test(value)) {
    errorReporter.report(pointer, 'password', `Password must contain at least one special character (${specialCharacters})`, arrayExpressionPointer)
  } else if(!containsOnlyAllowedCharacters.test(value)) {
    errorReporter.report(pointer, 'password', `Password must only contain valid characters (0-9, a-z, A-Z, ${specialCharacters})`, arrayExpressionPointer)
  }
})
