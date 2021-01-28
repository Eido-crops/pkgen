import cli from '@/cmd/cac'
import initClerk from '@/pkg/clerks/init/clerk'
import getInfoClerk from '@/pkg/clerks/get/info/clerk'
import genPkgClerk from '@/pkg/clerks/generate/package/clerk'
const chalk = require('chalk')

export default ():void => {
    cli
    .command("", "Generate a package based on the hierarchical structure described in .pkgen.yml.")
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

            const { getBaseYaml, getOutpostYaml } = getInfoClerk.Services()
            const { genPkg } = genPkgClerk.Services()

            genPkg(
                getOutpostYaml(),
                "pkg",
                getBaseYaml()("lang"),
                getBaseYaml()("currentTemplate")
            )

        })()
    })
}