export default function envVar(name: string, defaultValue?: string | number | undefined): string | number {
  const val = process.env[name]
  if (typeof val === 'undefined') {
    if (defaultValue !== undefined) return defaultValue
    throw new Error(`environment variable '${name}' does not exist, value: ${JSON.stringify(process.env)}`)
  }
  const stringVal = String(val).trim()
  const numVal = Number(stringVal)
  return Number.isNaN(numVal) ? stringVal : numVal
}
