import { describe, test, it, expect } from 'vitest'
import envVar from './env'

describe('envVar', () => {
  it('returns correct value for string', () => {
    const name = 'testIt'
    const value = 'a value'
    process.env[name] = value
    const result = envVar(name)
    expect(result).toBe(value)
  })
  it('returns correct value for number', () => {
    const name = 'testNumber'
    const value = 42
    process.env[name] = value.toString()
    const result = envVar(name)
    expect(result).toBe(value)
  })
  it('throws error for non-existent variable', () => {
    const name = 'shouldNotExist'
    return expect(envVar.bind(null, name)).toThrowError(`environment variable '${name}'`)
  })
})

test("NODE_ENV should be 'test'", () => {
  const result = envVar('NODE_ENV')
  expect(result).toEqual('test')
})
