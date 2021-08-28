import logger from './log'
import { envString } from './env'
import './unhandled-error-handling'

logger.info(`Hello world! Running in '${envString('NODE_ENV')}' mode`)
