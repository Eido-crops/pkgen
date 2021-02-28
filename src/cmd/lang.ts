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
    .command("lang", "Change the selected programming language.")
    .action(():void => {
        (async() => {
            const isInitialize = await cPrint.Introduction()
            await cBuild.Basis()
            const isInit = await isInitialize()

            if(isInit){
                console.log(`⚠️  ${chalk.red("Couldn't find the environment require to use the pkgen command, so rebuilt it.")}`)
                return
            }


            if(cGet.LangList(cRead.BaseYaml("currentTemplate")).length == 0){
                console.log(`⚠️  ${chalk.red("Process cannot continue, because this template is empty.")}`)
                return
            }

            inquirer.prompt([
                {
                    type: "list",
                    name: "lang",
                    message: `Select the programming language you want to use.\n${cRead.BaseYaml("lang")}(current) ->`,
                    choices: cGet.LangList(cRead.BaseYaml("currentTemplate"))
                }
            ])
            .then((answers:any) => {
                cUpdate.Config("lang", cRead.BaseYaml(null), answers.lang)
            })

        })()
    })
}