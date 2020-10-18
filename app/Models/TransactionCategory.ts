import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import TransactionIdentifier from 'App/Models/TransactionIdentifier'

export default class TransactionCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @hasMany(() => TransactionIdentifier)
  public identifiers: HasMany<typeof TransactionIdentifier>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
