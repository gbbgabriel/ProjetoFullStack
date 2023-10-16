// database/migrations/20231017120000_create_addresses.ts
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateAddresses extends BaseSchema {
  protected tableName = 'addresses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('client_id').unsigned().references('users.id').onDelete('CASCADE')
      table.string('street', 70).notNullable()
      table.string('number', 6).notNullable()
      table.string('city', 40).notNullable()
      table.string('state', 15).notNullable()
      table.string('cep', 8).notNullable()
      table.boolean('is_main').defaultTo(false)

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
