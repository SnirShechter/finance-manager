import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { validate } from '../../../lib/decorators/validate'
import TransactionCategory from 'App/Models/TransactionCategory'
import TransactionIdentifier from 'App/Models/TransactionIdentifier'

export default class TransactionClassifiersController {
  @validate({
    schema: schema.create({
      name: schema.string({ trim: true }, [rules.unique({ table: 'transaction_categories', column: 'name' })]),
    }),
  })
  public async addCategory({ request }: HttpContextContract) {
    const { name } = request.only(['name'])

    console.log(`Received ${name}`)
    const transactionCategory = await TransactionCategory.create({ name })

    return transactionCategory.serialize()
  }

  public async getAllCategories() {
    return await TransactionCategory.all()
  }

  @validate({
    schema: schema.create({
      categoryId: schema.number([rules.exists({ table: 'transaction_categories', column: 'id' })]),
      identifier: schema.string({ trim: true }, [
        rules.unique({ table: 'transaction_identifiers', column: 'identifier' }),
      ]),
    }),
  })
  public async addIdentifier({ request }: HttpContextContract) {
    const { categoryId, identifier } = request.only(['categoryId', 'identifier'])

    console.log(`Received identifier ${identifier} categoryId ${categoryId}`)
    const transactionIdentifier = await TransactionIdentifier.create({ identifier, categoryId })

    return transactionIdentifier.serialize()
  }

  public async getAllIdentifiers() {
    return await TransactionIdentifier.query().preload('category')
  }
}
