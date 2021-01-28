import cli from '@/cmd/cac'
import { version } from '@/version'
import rootCmd from '@/cmd/root'
import langCmd from '@/cmd/lang'
import tplCmd from '@/cmd/template'

cli.name = "pkgen"
cli.version(version)

rootCmd()
langCmd()
tplCmd()

cli.help()
   .usage("<commands>")
cli.parse()

export default cli