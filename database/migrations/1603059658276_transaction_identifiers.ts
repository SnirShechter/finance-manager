import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TransactionIdentifiers extends BaseSchema {
  protected tableName = 'transaction_identifiers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('identifier')
      table.integer('category_id').references('id').inTable('transaction_categories')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
