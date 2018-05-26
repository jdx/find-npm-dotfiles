import {Command, flags} from '@oclif/command'
import ux from 'cli-ux'
import * as _ from 'lodash'

const packages = require('all-the-package-names')
const listNpmContents = require('list-npm-contents')

const exclude = [
  '.babelrc',
  '.bithoundrc',
  '.bower.json',
  '.bowerrc',
  '.circleci',
  '.coveralls.yml',
  '.dockerignore',
  '.editorconfig',
  '.eslintignore',
  '.eslintrc',
  '.eslintrc.js',
  '.eslintrc.json',
  '.eslint.json',
  '.flowconfig',
  '.git-hooks',
  '.gitattributes',
  '.github',
  '.gitignore',
  '.gitmodules',
  '.idea',
  '.jsbeautifyrc',
  '.jscrc',
  '.jscsrc',
  '.jsdoc.json',
  '.jshintignore',
  '.jshintrc',
  '.lint',
  '.lintignore',
  '.npmignore',
  '.nvmrc',
  '.postcssrc.js',
  '.prettierignore',
  '.prettierrc',
  '.slugignore',
  '.sublime-project',
  '.tern-project',
  '.testignore',
  '.travis.yml',
  '.istanbul.yml',
  '.vimrc',
]

class FindNpmDotfiles extends Command {
  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'file'}]

  async run() {
    this.parse(FindNpmDotfiles)
    let name: string
    while (name = _.sample(packages)) {
      ux.action.start(`fetching ${name}`)
      try {
        let files = await listNpmContents(name) as string[]
        files = files.filter(f => {
          if (!f.startsWith('.')) return false
          if (exclude.find(e => f === e || f.startsWith(e + '/'))) return false
          return true
        })
        for (let f of files) {
          ux.log(`${name}: ${f}`)
        }
      } catch (err) {
        ux.warn(name)
        ux.warn(err)
      }
    }
  }
}

export = FindNpmDotfiles
