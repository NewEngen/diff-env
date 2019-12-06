import * as dotenv from 'dotenv'

// Utils
import {findMissingKeys} from './missing-keys'

// Type Deps
import {TMissingKeys, TConfig} from './types'

/**
 * diffEnv
 * Compare 2 config files against each other
 * @param {string} againstPath -  path to config file to check against
 * @param {string} checkPath -  path to override config file to search for missing params in - defaults to: .env
 * @returns {Promise} Promise object returns  (TMissingKeys | null)
 */
const diffEnv = async (againstPath: string, checkPath: string | null = null): Promise<TMissingKeys | null> => {
  return new Promise((resolve, reject) => {
    const {parsed: check} = checkPath ? dotenv.config({path: checkPath}) : dotenv.config()
    const {parsed: against} = dotenv.config({path: againstPath})

    // Throw errors if we can't find appropriate configs to match
    if (!check) {
      reject(new Error('Could not find the secondary or bases env config.'))
    }
    if (!against) {
      reject(new Error('Could not find env file with given path to use.'))
    }

    const keys = findMissingKeys(against as TConfig, check as TConfig)
    resolve(keys.missing.length === 0 && keys.unset.length === 0 ? null : keys)
  })
}

export {diffEnv}
