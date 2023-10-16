// App/Models/Address.ts
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public clientId: number

  @belongsTo(() => User)
  public client: BelongsTo<typeof User>

  @column()
  public street: string

  @column()
  public number: string

  @column()
  public city: string

  @column()
  public state: string

  @column()
  public cep: string

  @column()
  public is_main: boolean
}
