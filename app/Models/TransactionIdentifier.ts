import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import TransactionCategory from 'App/Models/TransactionCategory'

export default class TransactionIdentifier extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public categoryId: number

  @column({ isPrimary: true })
  public identifier: string

  @belongsTo(() => TransactionCategory, { foreignKey: 'categoryId' })
  public category: BelongsTo<typeof TransactionCategory>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
