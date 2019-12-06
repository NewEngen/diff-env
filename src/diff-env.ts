import * as dotenv from 'dotenv'

type TPossibleKeys = 'missing' | 'unset';

type TMissingKeys = {
  missing: string[];
  unset: string[];
}

type TConfig = {
  [key: string]: string;
}

type TTableConfig = {
  parameter: string;
  value: string;
}

/**
 * diffEnv
 * Compare 2 config files against each other
 *
 * @param againstPath: string - path to config file to check against
 * @param checkPath: (optional) string - default: .env
 * @returns TMissingKeys | null
 */
const diffEnv = async (againstPath: string, checkPath: string | null = null): Promise<TMissingKeys | null> => {
  return new Promise((resolve, reject) => {
    const { parsed: against } = dotenv.config({ path: againstPath });
    const { parsed: check } = checkPath ? dotenv.config({ path: checkPath }) : dotenv.config();

    // Throw errors if we can't find appropriate configs to match
    if (!against) { reject('Could not find env file with given path to use.') }
    if (!check) { reject('Could not find the secondary or bases env config.') }

    const keys = findMissingKeys(<TConfig>against, <TConfig>check);
    resolve(!keys.missing.length && !keys.unset.length ? null : keys);
  });
};

/**
 * findMissingKeys
 * Search for missing or unset keys in a given env file
 *
 * @param against: { [key: string]: string }
 * @param check: { [key: string]: string }
 * @returns TMissingKeys
 */
const findMissingKeys = (against: TConfig, check: TConfig): TMissingKeys => {
  const mKey = 'missing'
  const uKey = 'unset'

  return Object.keys(against).reduce(
    (prev: TMissingKeys, cur: string) => {
      if (!check.hasOwnProperty(cur)) {
        prev[mKey].push(`${cur}=${against[cur]}`)
      }

      if (check[cur] === '') {
        prev[uKey].push(`${cur}=${against[cur]}`)
      }

      return prev
    },
    { missing: [], unset: [] },
  )
}

/**
 *
 * @param keysObj: TMissingKeys
 * @returns TTableConfig[]
 */
const formatKeys = (keysObj: TMissingKeys): TTableConfig[] => {
  return Object.keys(keysObj).reduce((prev: TTableConfig[], cur: string) => {
    return prev.concat(
      keysObj[cur as TPossibleKeys].reduce((a: TTableConfig[], c: string) => {
        const [parameter, value] = c.split('=')
        a.push({ parameter, value })
        return a
      }, [])
    )
  }, [])
}

export { diffEnv, formatKeys }
