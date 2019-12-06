// Type Deps
import {TMissingKeys, TConfig} from './types'

/**
 * findMissingKeys - Search for missing or unset keys in a given env file
 * @param {object} against - Object containing key value pairs from env file
 * @param {object} check - Object containing key value pairs from env file
 * @returns {object} - Object with missing and unset keys
 */
const findMissingKeys = (against: TConfig, check: TConfig): TMissingKeys => {
  const mKey = 'missing'
  const uKey = 'unset'

  return Object.keys(against).reduce(
    (prev: TMissingKeys, cur: string) => {
      if (!Object.prototype.hasOwnProperty.call(check, cur)) {
        prev[mKey].push(`${cur}=${against[cur]}`)
      }

      if (check[cur] === '') {
        prev[uKey].push(`${cur}=${against[cur]}`)
      }

      return prev
    },
    {missing: [], unset: []},
  )
}

export {findMissingKeys}
