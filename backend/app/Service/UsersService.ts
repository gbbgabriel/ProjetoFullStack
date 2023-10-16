import { UserRepository } from 'App/Repository/Interfaces/UserRepository'

export default class UsersService {
  private readonly userRepository: UserRepository
  constructor() {
    this.userRepository = new UserRepository()
  }

  public async index() {
    const user = await this.userRepository.index()

    if (!user.length) {
      throw new Error('Nenhum usuário encontrado!')
    }

    return user
  }

  public async store(data) {
    const emailExists = await this.userRepository.findByEmail(data.email)
    if (emailExists) {
      throw new Error('Email já cadastrado!')
    }

    return await this.userRepository.store(data)
  }

  public async show(userId) {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new Error('Usuário não encontrado!')
    }

    return user
  }

  public async update(userId, data) {
    const existingUser = await this.userRepository.findById(userId)
    if (!existingUser) {
      throw new Error('Usuário não encontrado')
    }

    const emailExists = await this.userRepository.findByEmail(data.email)
    if (emailExists && emailExists.id !== userId) {
      throw new Error('Email já cadastrado!')
    }

    const updatedUser = await this.userRepository.update(data, userId)

    return updatedUser
  }

  public async destroy(userId) {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new Error('Usuário não encontrado!')
    }

    await this.userRepository.destroy(userId)

    return user
  }
}
