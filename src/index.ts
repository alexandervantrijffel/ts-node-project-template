import logger from './log'

try {
  logger.info('Hello world!')
  throw new Error('test sourcemap')
} catch (error: unknown) {
  logger.error('unknown exception:', error)
}
