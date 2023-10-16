import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersService from 'App/Service/UsersService'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {
  private readonly usersService: UsersService
  constructor() {
    this.usersService = new UsersService()
  }

  public async index({ response }: HttpContextContract) {
    const users = await this.usersService.index()

    if (!users.length) {
      return response.status(404).json({ message: 'Nenhum usuário encontrado!' })
    }

    return response.status(200).json(users)
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = await Object.assign(request.validate(UserValidator))
      const user = await this.usersService.store(data)
      return response.status(201).json({ message: 'Usuário criado com sucesso!', user })
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const userId = request.params().id
      const user = await this.usersService.show(userId)
      return response.status(200).json(user)
    } catch (error) {
      return response.status(404).json({ message: 'Usuário não encontrado!' })
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const data = await request.body()
      const userId = request.params().id

      const updatedUser = await this.usersService.update(userId, data)
      return response
        .status(200)
        .json({ message: 'Usuário atualizado com sucesso!', user: updatedUser })
    } catch (error) {
      return response.status(404).json({ error: error.message })
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const userId = request.params().id
      await this.usersService.destroy(userId)
      return response.status(200).json({ message: 'Usuário deletado com sucesso!' })
    } catch (error) {
      return response.status(404).json({ message: 'Usuário não encontrado!' })
    }
  }
}
