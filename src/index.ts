import './unhandled-error-handling'
import logger from './log'
import envVar from './env'

logger.info(`Hello world! Running in '${envVar('NODE_ENV')}' mode, port ${envVar('PORT')}`)
