import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import * as chalk from 'chalk'

// DiffEnv
import {diffEnv} from './diff-env'

// Utils
import {formatKeys} from './format-keys'

class DiffEnv extends Command {
  static description = 'Compare env files against each other'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    check: flags.string({char: 'c', required: false, description: 'path to the config you want to compare. defaults to .env', default: '.env'}),
    against: flags.string({char: 'a', required: true, description: 'path of the config you want to compare against.'}),
  }

  async run() {
    const {flags} = this.parse(DiffEnv)

    try {
      cli.action.start(chalk.green(`Checking for missing/unset params in ${flags.check} using ${flags.against}`))
      const keys = await diffEnv(flags.against, flags.check)
      cli.action.stop()

      if (keys && typeof keys === 'object') {
        this.log(chalk.red.bold(`\n𐄂 - ${flags.check} does not match ${flags.against}\n`))
        cli.table(formatKeys(keys), {
          status: {},
          parameter: {
            minWidth: 10,
          },
          value: {},
        })
      } else {
        this.log(chalk.green.bold(`√ - ${flags.check} matches ${flags.against}`))
      }
    } catch (error) {
      this.catch(error)
    }
  }
}

export = DiffEnv
