import cli from '@/cmd/cac'

import cPrint from '@/pkg/clerk/print/services'
import cBuild from '@/pkg/clerk/build/services'
import cRead from '@/pkg/clerk/read/services'
import cGet from '@/pkg/clerk/get/services'
import cUpdate from '@/pkg/clerk/update/services'

const inquirer = require('inquirer')
const chalk = require('chalk')

export default ():void => {
    cli
    .command("template", "Change the selected package template.")
    .action(():void => {
        (async() => {
            const isInitialize = await cPrint.Introduction()
            await cBuild.Basis()
            const isInit = await isInitialize()

            if(isInit){
                console.log(`⚠️  ${chalk.red("Couldn't find the environment require to use the pkgen command, so rebuilt it.")}`)
                return
            }

            inquirer.prompt([
                {
                    type: "list",
                    name: "template",
                    message: `Select the package template you want to use.\n${cRead.BaseYaml("currentTemplate")}(current) ->`,
                    choices: cGet.TemplateList()
                }
            ])
            .then((answers:any) => {
                if(cGet.LangList(answers.template).length == 0) {
                    console.log(`⚠️  ${chalk.red("Process cannot continue, because this template is empty.")}`)
                    return
                }
                cUpdate.Config("currentTemplate", cRead.BaseYaml(null), answers.template)
                cUpdate.Config("lang", cRead.BaseYaml(null), cGet.LangList(answers.template)[0])
            })

        })()
    })
}