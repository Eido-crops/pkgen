import cli from '@/cmd/cac'

import _print from '@/pkg/clerk/print/services'
import _build from '@/pkg/clerk/build/services'
import _read from '@/pkg/clerk/read/services'
import _get from '@/pkg/clerk/get/services'
import _update from '@/pkg/clerk/update/services'

const inquirer = require('inquirer')
const chalk = require('chalk')

export default ():void => {
    cli
    .command("lang", "Change the selected programming language.")
    .action(():void => {
        (async() => {
            const isInitialize = await _print.Introduction()
            await _build.Basis()
            const isInit = await isInitialize()

            if(isInit){
                console.log(`⚠️  ${chalk.red("Couldn't find the environment require to use the pkgen command, so rebuilt it.")}`)
                return
            }


            if(_get.LangList(_read.BaseYaml("currentTemplate")).length == 0){
                console.log(`⚠️  ${chalk.red("Process cannot continue, because this template is empty.")}`)
                return
            }

            inquirer.prompt([
                {
                    type: "list",
                    name: "lang",
                    message: `Select the programming language you want to use.\n${_read.BaseYaml("lang")}(current) ->`,
                    choices: _get.LangList(_read.BaseYaml("currentTemplate"))
                }
            ])
            .then((answers:any) => {
                _update.Config("lang", _read.BaseYaml(null), answers.lang)
            })

        })()
    })
}