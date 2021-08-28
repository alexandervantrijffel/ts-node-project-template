import dotenv from 'dotenv'
import logger from './log'
import { envString } from './env'
import './unhandled-error-handling'

dotenv.config()

logger.info(`Hello world! Running in '${envString('NODE_ENV')}' mode`)
