import logger from './log'
import envVar from './env'
import './unhandled-error-handling'

logger.info(`Hello world! Running in '${envVar('NODE_ENV')}' mode, port ${envVar('PORT')}`)
