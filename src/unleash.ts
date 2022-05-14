import { initialize, Context } from 'unleash-client'
import logger from './log'
import envVar from './env'

const url = String(envVar('UNLEASH_URL'))

const unleash = initialize({
  url,
  appName: 'ts-node-project-template',
  environment: process.env.APP_ENV,
  instanceId: 'default-instance',
  customHeaders: {
    Authorization: String(envVar('UNLEASH_AUTHENTICATION')),
  },
})

export const isEnabled = (name: string, context?: Context, defaultValue?: boolean) => {
  return unleash.isEnabled(name, context, (_name: string, _context: Context) => defaultValue ?? false)
}

unleash.on('synchronized', () => {
  // Unleash is ready to serve updated feature toggles.
  // synchronized = true;

  // Check the variant
  const variant = unleash.getVariant('app.ToggleY')
  logger.info(`toggle bottled-water is enabled [${isEnabled('bottled-water')}], variant [${variant}]`)
})
// Check a feature flag
logger.info(`early check [${isEnabled('bottled-water', undefined)}]`)

export default unleash
