import logger from './log'

logger.info('Hello world!')

try {
  throw new Error('test sourcemap')
} catch (error: unknown) {
  logger.error('unknown exception:', error)
}
