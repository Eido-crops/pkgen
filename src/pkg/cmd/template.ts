import cli from '@/pkg/core/cac'
import initClerk from '@/pkg/clerks/init/clerk'
import getInfoClerk from '@/pkg/clerks/get/info/clerk'
import updateClerk from '@/pkg/clerks/update/clerk'
const inquirer = require('inquirer')
const chalk = require('chalk')

export default ():void => {
    cli
    .command("template", "Change the selected package template.")
    .action(():void => {
        (async() => {
            const { greet, buildEnvironment } = initClerk.Services()
            const isInitialized = await greet()
            await buildEnvironment()
            const isInit = await isInitialized()

            if(isInit){
                console.log(`⚠️  ${chalk.red("Couldn't find the environment require to use the pkgen command, so rebuilt it.")}`)
                return
            }

            const { getBaseYaml, getTemplateList } = getInfoClerk.Services()
            const { updateConfig } = updateClerk.Services()

            inquirer.prompt([
                {
                    type: "list",
                    name: "template",
                    message: `Select the package template you want to use.\n${getBaseYaml()("currentTemplate")}(current) ->`,
                    choices: getTemplateList()
                }
            ])
            .then((answers:any) => {
                updateConfig("currentTemplate", getBaseYaml()(null), answers.template)
            })

        })()
    })
}