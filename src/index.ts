import cli from 'cli-ux';
import {Command, flags } from '@oclif/command'
import { diffEnv, formatKeys } from './diff-env';

class DiffEnv extends Command {
  static description = 'Compare env files against each other.'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    check: flags.string({ char: 'c', required: false, description: 'path to the config you want to compare. defaults to .env', default: '.env' }),
    against: flags.string({ char: 'a', required: true, description: 'path of the config you want to compare against.' }),
  }

  static args = []

  async run() {
    const { flags } = this.parse(DiffEnv)

    try {
      cli.action.start(`Checking ${flags.check} -> ${flags.against}`)
      const keys = await diffEnv(flags.against, flags.check)
      cli.action.stop()

      if(!!keys) {
        cli.table(formatKeys(keys), {
          parameter: {
            minWidth: 7
          },
          value: {}
        })
      } else {
        this.log('Config files are matching!')
      }
    } catch(err) {
      this.catch(err)
    }
  }
}

export = DiffEnv
