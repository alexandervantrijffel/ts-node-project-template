import logger from './log'

process.on('unhandledRejection', (reason: Error, _p: Promise<unknown>) => {
  // since we already have fallback handler for unhandled errors
  // we'll rethrow it here
  throw reason
})

process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught exception, exiting process', error)
  process.exit(1)
})
