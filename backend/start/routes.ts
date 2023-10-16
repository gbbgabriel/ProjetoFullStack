import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/users', 'UsersController.index')
  Route.post('/users', 'UsersController.store')
  Route.get('/users/:id', 'UsersController.show')
  Route.put('/users/:id', 'UsersController.update')
  Route.delete('/users/:id', 'UsersController.destroy')

  Route.group(() => {
    Route.get('/', 'AddressesController.index')
    Route.post('/', 'AddressesController.store')
    Route.get('/:id', 'AddressesController.show')
    Route.put('/:id', 'AddressesController.update')
    Route.delete('/:id', 'AddressesController.destroy')
  }).prefix('/users/:client_id/addresses')
})
