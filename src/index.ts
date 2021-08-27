import dotenv from 'dotenv'
import logger from './log'
import { envString } from './env'
dotenv.config()

logger.info(`Hello world! Running in '${envString('NODE_ENV')}' mode`)
