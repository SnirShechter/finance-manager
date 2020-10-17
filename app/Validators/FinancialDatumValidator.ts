import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class FinancialDatumValidator {
  constructor(private ctx: HttpContextContract, private credentialsFields) {
    this.schema = schema.create({
      ...Object.fromEntries(credentialsFields.map((key) => [key, schema.string({ trim: true })])),
      startDate: schema.date.optional({}, [rules.before('today')]),
    })
  }

  public schema = schema.create({
    ...Object.fromEntries(this.credentialsFields.map((key) => [key, schema.string({ trim: true })])),
    startDate: schema.date.optional({}, [rules.before('today')]),
  })
  public cacheKey = this.ctx.routeKey
  public messages = {}
}
