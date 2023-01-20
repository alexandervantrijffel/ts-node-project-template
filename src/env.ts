export default function envVar(
  name: string,
  defaultValue?: string | number | boolean | undefined,
): string | number | boolean {
  const val = process.env[name]
  if (typeof val === 'undefined') {
    if (defaultValue !== undefined) return defaultValue
    throw new Error(`environment variable '${name}' does not exist, value: ${JSON.stringify(process.env)}`)
  }
  const stringVal = String(val).trim()
  if (stringVal.toLowerCase() === 'true' || stringVal.toLowerCase() === 'false') {
    return stringVal === 'true'
  }

  const numVal = Number(stringVal)
  return Number.isNaN(numVal) ? stringVal : numVal
}
