import {expect, test} from '@oclif/test'

import cmd = require('../src')

describe('diff-env', () => {
  test
  .stdout()
  .do(() => cmd.run(['--against', './configs/matching.env']))
  .it('Shows success message when config files match', ctx => {
    expect(ctx.stdout).to.contain('√')
  })

  test
  .stdout()
  .do(() => cmd.run(['--against', './configs/missing.env']))
  .it('Shows error message when config files do not match', ctx => {
    expect(ctx.stdout).to.contain('𐄂')
  })
})
