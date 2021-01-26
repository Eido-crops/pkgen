import cli from '@/pkg/core/cac'
import initClerk from '@/pkg/clerks/init/clerk'
import getInfoClerk from '@/pkg/clerks/get/info/clerk'
import updateClerk from '@/pkg/clerks/update/clerk'
const inquirer = require('inquirer')
const chalk = require('chalk')

export default ():void => {
    cli
    .command("lang", "Change the selected programming language.")
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

            const { getBaseYaml, getLangList } = getInfoClerk.Services()
            const { updateConfig } = updateClerk.Services()

            if(getLangList(getBaseYaml()("currentTemplate")).length == 0){
                console.log(`⚠️  ${chalk.red("Process cannot continue, because this template is empty.")}`)
                return
            }

            inquirer.prompt([
                {
                    type: "list",
                    name: "lang",
                    message: `Select the programming language you want to use.\n${getBaseYaml()("lang")}(current) ->`,
                    choices: getLangList(getBaseYaml()("currentTemplate"))
                }
            ])
            .then((answers:any) => {
                updateConfig("lang", getBaseYaml()(null), answers.lang)
            })

        })()
    })
}