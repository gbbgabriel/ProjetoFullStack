import User from 'App/Models/User'
import { UserInterface } from './UserInterface'

export class UserRepository implements UserInterface {
  public async index(): Promise<any> {
    return User.all()
  }

  public async store(data: any): Promise<any> {
    return User.create(data)
  }

  public async findById(id: number): Promise<User | null> {
    const user = User.findBy('id', id)
    return user
  }

  public async findByEmail(email: string): Promise<User | null> {
    return User.findBy('email', email)
  }

  public async findByCpf(cpf: string): Promise<User | null> {
    const user = User.findBy('cpf', cpf)
    return user
  }

  public async findByPhone(phone: string): Promise<User | null> {
    const user = User.findBy('phone', phone)
    return user
  }

  public async update(data: User, id): Promise<User | null> {
    const user = await this.findById(id)

    if (!user) {
      return null
    }

    user.merge(data)
    await user.save()
    return user
  }

  public async destroy(id: number): Promise<User> {
    const user = await User.findOrFail(id)
    await user.delete()
    return user
  }
}
