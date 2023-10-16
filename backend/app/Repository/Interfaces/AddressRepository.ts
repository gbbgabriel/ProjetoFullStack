// App/Repository/AddressRepository.ts
import Address from 'App/Models/Address'
import { AddressInterface } from './AddressInterface'

export default class AddressRepository implements AddressInterface {
  public async index(clientId: number): Promise<Address[]> {
    return Address.query().where('client_id', clientId).orderBy('created_at', 'desc')
  }

  public async store(data: any, clientId: number): Promise<Address> {
    return Address.create({ ...data, clientId })
  }

  public async findById(id: number, clientId: number): Promise<Address | null> {
    return Address.query().where('id', id).andWhere('client_id', clientId).first()
  }

  public async clearMainAddress(clientId: number): Promise<void> {
    await Address.query().where('client_id', clientId).update({ is_main: false })
  }

  public async update(data: Address, id: number, clientId: number): Promise<Address | null> {
    const address = await this.findById(id, clientId)

    if (!address) {
      return null
    }

    address.merge(data)
    await address.save()

    return address
  }

  public async destroy(id: number, clientId: number): Promise<Address> {
    const address = await this.findById(id, clientId)

    if (!address) {
      throw new Error('Endereço não encontrado!')
    }

    await address.delete()

    return address
  }

  public async findMainAddress(clientId: number, excludeId?: number): Promise<Address | null> {
    let query = Address.query().where('client_id', clientId).andWhere('is_main', true)

    if (excludeId) {
      query = query.whereNot('id', excludeId)
    }

    return query.first()
  }
}
