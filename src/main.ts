import cli from '@/pkg/core/cac'
import { version } from '@/version'
import rootCmd from '@/pkg/cmd/root'
import langCmd from '@/pkg/cmd/lang'
import tplCmd from '@/pkg/cmd/template'

cli.name = "pkgen"
cli.version(version)

rootCmd()
langCmd()
tplCmd()

cli.help()
   .usage("<commands>")
cli.parse()

export default cli