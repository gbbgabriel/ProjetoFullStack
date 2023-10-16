// App/Service/AddressesService.ts
import Address from 'App/Models/Address'
import AddressRepository from 'App/Repository/Interfaces/AddressRepository'
import UsersService from './UsersService'

export default class AddressesService {
  private readonly addressRepository: AddressRepository
  private readonly userServices: UsersService
  constructor() {
    this.addressRepository = new AddressRepository()
    this.userServices = new UsersService()
  }

  public async index(clientId: number) {
    const client = await this.userServices.show(clientId)

    if (!client) {
      throw new Error('Cliente não encontrado!')
    }

    const addresses = await this.addressRepository.index(clientId)

    if (!addresses.length) {
      throw new Error('Nenhum endereço encontrado!')
    }

    return addresses
  }

  public async store(data: any, clientId: number) {
    const { is_main } = data

    if (is_main) {
      await this.addressRepository.clearMainAddress(clientId)
    }

    return await this.addressRepository.store(data, clientId)
  }

  public async show(id: number, clientId: number) {
    const address = await this.addressRepository.findById(id, clientId)
    if (!address) {
      throw new Error('Endereço não encontrado!')
    }

    return address
  }

  public async update(id: number, data: any, clientId: number) {
    const client = await this.userServices.show(clientId)

    if (!client) {
      throw new Error('Cliente não encontrado!')
    }

    const existingAddress = await this.addressRepository.findById(id, clientId)
    if (!existingAddress) {
      throw new Error('Endereço não encontrado')
    }

    const { is_main } = data

    const mainAddressExists = await this.addressRepository.findMainAddress(clientId, id)
    if (is_main && mainAddressExists) {
      await this.addressRepository.clearMainAddress(clientId)
    }

    const updatedAddress = await this.addressRepository.update(data, id, clientId)

    return updatedAddress
  }

  public async destroy(id: number, clientId: number) {
    const client = await this.userServices.show(clientId)

    if (!client) {
      throw new Error('Cliente não encontrado!')
    }

    const address = await this.addressRepository.findById(id, clientId)
    if (!address) {
      throw new Error('Endereço não encontrado!')
    }

    await this.addressRepository.destroy(id, clientId)

    return address
  }
}
