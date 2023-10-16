import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    cpf: schema.string(),
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string(),
    phone: schema.string(),
  })

  public messages: CustomMessages = {
    'name.required': 'O campo nome é obrigatório.',
    'name.minLength': 'O campo nome deve ter pelo menos 3 caracteres.',
    'name.maxLength': 'O campo nome deve ter no máximo 255 caracteres.',
    'cpf.regex': 'O campo CPF deve ter um formato válido (ex: 123.456.789-09).',
    'cpf.unique': 'Este CPF já está cadastrado.',
    'email.email': 'O campo email deve ser um endereço de email válido.',
    'email.unique': 'Este email já está cadastrado.',
    'password.minLength': 'A senha deve ter no mínimo 6 caracteres.',
    'phone.regex': 'O campo telefone deve ter um formato válido (ex: (99) 99999-9999).',
    'phone.unique': 'Este telefone já está cadastrado.',
  }
}
