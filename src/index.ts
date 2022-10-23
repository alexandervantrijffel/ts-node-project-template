import dotenv from 'dotenv'

import './unhandled-error-handling'
import readline from 'readline'
import logger from './log'
import envVar from './env'

dotenv.config()

logger.info(`Hello world! Running in '${envVar('NODE_ENV')}' mode, port ${envVar('PORT')}`)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('What is your biggest dream?', (answer) => console.log(`${answer} is a great answer!`))
