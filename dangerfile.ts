import { danger, fail, markdown, warn } from 'danger'
import jest from 'danger-plugin-jest'
import fs from 'fs'

const appFiles = danger.git.fileMatch('**/*.ts').getKeyedPaths()
const testFiles = danger.git.fileMatch('**/*.test.ts').getKeyedPaths()

export enum Rules {
  FILES_AMOUNT,
  MISSING_TESTS,
  PR_TITLE,
  PR_DESCRIPTION,
  PR_TICKET_IN_DESCRIPTION,
}

export const DEFAULT_RULES = [
  Rules.FILES_AMOUNT,
  Rules.MISSING_TESTS,
  Rules.PR_TITLE,
  Rules.PR_DESCRIPTION,
  Rules.PR_TICKET_IN_DESCRIPTION,
]

if (fs.existsSync('jest-test-output.json')) {
  jest({ testResultsJsonPath: 'jest-test-output.json' })
}
const hasCorrectType = (title: string): boolean =>
  /^\s*(BREAKING|chore|ci|feat|fix|refactor|revert|docs|test|style|perf).*/.test(title)

if (!hasCorrectType(danger.github.pr.title)) {
  fail(`:pencil2: Wrong PR title - It doesn't follow the conventional commits standard.`)
}

const bodyLength = danger.github.pr.body?.length
if (!bodyLength || bodyLength < 10) {
  warn(':page_with_curl: Empty description - Please add some context for the reviewer.')
}

// Warn when PR size is large
const bigPRThreshold = 600
const codeChurn = danger.github.pr.additions + danger.github.pr.deletions
if (codeChurn > bigPRThreshold) {
  warn(`:exclamation: Big PR (${codeChurn} lines)`)
  markdown(
    `> (${codeChurn}) : Pull Request size seems relatively large. If Pull Request contains multiple changes, split each into separate PR will helps faster, easier review.`,
  )
}
