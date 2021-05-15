import cli from '@/cmd/cac'

import { INITIALIZED_MSG } from '@/config'

import _print from '@/pkg/clerk/print/services'
import _build from '@/pkg/clerk/build/services'
import _read from '@/pkg/clerk/read/services'
import _get from '@/pkg/clerk/get/services'
import _update from '@/pkg/clerk/update/services'

const inquirer = require('inquirer')
const chalk = require('chalk')

export default ():void => {
    cli
    .command("template", "Change the selected package template.")
    .action(():void => {
        (async() => {
            const isInitialize = await _print.Introduction()
            await _build.Basis()
            const isInit = await isInitialize()

            if(isInit){
                console.log(INITIALIZED_MSG)
                return
            }

            inquirer.prompt([
                {
                    type: "list",
                    name: "template",
                    message: `Select the package template you want to use.\n${_read.BaseYaml("currentTemplate")}(current) ->`,
                    choices: _get.TemplateList()
                }
            ])
            .then((answers:any) => {
                if(_get.LangList(answers.template).length == 0) {
                    console.log(`⚠️  ${chalk.red("Process cannot continue, because this template is empty.")}`)
                    return
                }
                _update.Config("currentTemplate", _read.BaseYaml(null), answers.template)
                _update.Config("lang", _read.BaseYaml(null), _get.LangList(answers.template)[0])
            })

        })()
    })
}