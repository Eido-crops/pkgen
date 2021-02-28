import cli from '@/cmd/cac'

import cPrint from '@/pkg/clerk/print/services'
import cBuild from '@/pkg/clerk/build/services'
import cRead from '@/pkg/clerk/read/services'
import cExpand from '@/pkg/clerk/expand/services'
import cGen from '@/pkg/clerk/generate/services'

const chalk = require('chalk')

export default ():void => {
    cli
    .command("", "Generate a package based on the hierarchical structure described in .pkgen.yml.")
    .action(():void => {
        (async() => {
            const isInitialize = await cPrint.Introduction()
            await cBuild.Basis()
            const isInit = await isInitialize()

            if(isInit){
                console.log(`⚠️  ${chalk.red("Couldn't find the environment require to use the pkgen command, so rebuilt it.")}`)
                return
            }
            
            cGen.Package(
                cExpand.Yaml(cRead.PkgenYaml()),
                "pkg",
                cRead.BaseYaml("lang"),
                cRead.BaseYaml("currentTemplate")
            )

        })()
    })
}