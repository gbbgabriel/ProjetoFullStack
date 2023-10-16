import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AddressesService from 'App/Service/AddressService'
import AddressValidator from 'App/Validators/AddressValidator'

export default class AddressesController {
  private readonly addressesService: AddressesService
  constructor() {
    this.addressesService = new AddressesService()
  }

  public async index({ params, response }: HttpContextContract) {
    try {
      const clientId = params.client_id
      const addresses = await this.addressesService.index(clientId)

      return response.status(200).json(addresses)
    } catch (error) {
      return response.status(404).json({ message: error.message })
    }
  }

  public async store({ request, params, response }: HttpContextContract) {
    const clientId = params.client_id
    try {
      const data = await request.validate(AddressValidator)
      const address = await this.addressesService.store(data, clientId)
      return response.status(201).json({ message: 'Endereço criado com sucesso!', address })
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const clientId = params.client_id
    const addressId = params.id
    try {
      const address = await this.addressesService.show(addressId, clientId)
      return response.status(200).json(address)
    } catch (error) {
      return response.status(404).json({ message: 'Endereço não encontrado!' })
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    const clientId = params.client_id
    const addressId = params.id
    try {
      const data = await request.body()
      const updatedAddress = await this.addressesService.update(addressId, data, clientId)
      return response
        .status(200)
        .json({ message: 'Endereço atualizado com sucesso!', address: updatedAddress })
    } catch (error) {
      return response.status(404).json({ error: error.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const clientId = params.client_id
    const addressId = params.id
    try {
      await this.addressesService.destroy(addressId, clientId)
      return response.status(200).json({ message: 'Endereço deletado com sucesso!' })
    } catch (error) {
      return response.status(404).json({ message: error.message })
    }
  }
}
