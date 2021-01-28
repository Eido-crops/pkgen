import cli from '@/cmd/cac'
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

            const { getBaseYaml, getTemplateList, getLangList } = getInfoClerk.Services()
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
                if(getLangList(answers.template).length == 0) {
                    console.log(`⚠️  ${chalk.red("Process cannot continue, because this template is empty.")}`)
                    return
                }
                updateConfig("currentTemplate", getBaseYaml()(null), answers.template)
                updateConfig("lang", getBaseYaml()(null), getLangList(answers.template)[0])
            })

        })()
    })
}