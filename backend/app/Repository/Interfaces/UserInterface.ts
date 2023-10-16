import User from 'App/Models/User'

export interface UserInterface {
  index(): Promise<User[]>
  store(data: User): Promise<User>
  findById(id: number): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findByCpf(cpf: string): Promise<User | null>
  findByPhone(phone: string): Promise<User | null>
  update(data: User, id: number): Promise<User | null>
  destroy(id: number): Promise<User>
}
