import chalk = require('chalk')

// Type Deps
import {TMissingKeys, TTableConfig, TPossibleKeys} from './types'

/**
 * formatKeys - formats missing keys object into an array of objects
 * @param {object} keysObj - Object containing missing and unset keys of type {TMissingKeys}
 * @returns {array} - Array of objects of type {TTableConfig}
 */
const formatKeys = (keysObj: TMissingKeys): TTableConfig[] => {
  return Object.keys(keysObj).reduce((prev: TTableConfig[], cur: string) => {
    return prev.concat(
      keysObj[cur as TPossibleKeys].reduce((a: TTableConfig[], c: string) => {
        const [parameter, value] = c.split('=')
        a.push({parameter, value, status: cur === 'missing' ? chalk.red('missing') : chalk.yellow('unset')})
        return a
      }, [])
    )
  }, [])
}

export {formatKeys}
