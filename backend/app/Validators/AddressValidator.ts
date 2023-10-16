import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default {
  schema: schema.create({
    street: schema.string(),
    number: schema.string(),
    city: schema.string(),
    state: schema.string(),
    cep: schema.string({}, [
      rules.regex(/^\d{5}-\d{3}$/), // 12345-678
    ]),
    is_main: schema.boolean.optional(),
  }),

  messages: {
    'street.required': 'O campo de rua é obrigatório.',
    'number.required': 'O campo de número é obrigatório.',
    'city.required': 'O campo de cidade é obrigatório.',
    'state.required': 'O campo de estado é obrigatório.',
    'cep.required': 'O campo de CEP é obrigatório.',
    'cep.regex': 'O formato do CEP é inválido. Use o formato 12345-678.',
  },
}
