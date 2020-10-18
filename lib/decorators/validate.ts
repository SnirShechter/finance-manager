import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export function validate(validation, ...args) {
  const validValidationTypes = ['object', 'function']
  if (!validValidationTypes.includes(typeof validation)) {
    throw Error(`[Validate decorator]: Invalid validation received, must be one of: ${validValidationTypes.join(', ')}`)
  }
  // @ts-ignore
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = async function (ctx: HttpContextContract) {
      validation = typeof validation === 'function' ? new validation(ctx, ...args) : validation
      await ctx.request.validate(validation)
      return await originalMethod.apply(this, [ctx])
    }
  }
}
