import { envString } from './env'
describe('envString', () => {
  it('returns correct value', () => {
    const name = 'testIt'
    const value = 'a value'
    process.env[name] = value
    const result = envString(name)
    expect(result).toBe(value)
  })
  it('throws error for non-existent variable', () => {
    const name = 'shouldNotExist'
    return expect(envString.bind(null, name)).toThrowError(`environment variable '${name}'`)
  })
})

test("NODE_ENV should be 'test'", () => {
  const result = envString('NODE_ENV')
  expect(result).toEqual('test')
})
