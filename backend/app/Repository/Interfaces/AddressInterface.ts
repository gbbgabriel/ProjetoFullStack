import Address from 'App/Models/Address'

export interface AddressInterface {
  index(clientId: number): Promise<Address[]>
  store(data: any, clientId: number): Promise<Address>
  findById(id: number, clientId: number): Promise<Address | null>
  update(data: Address, id: number, clientId: number): Promise<Address | null>
  destroy(id: number, clientId: number): Promise<Address>
  findMainAddress(clientId: number, excludeId?: number): Promise<Address | null>
}
