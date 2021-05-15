import cli from '@/cmd/cac'

import _print from '@/pkg/clerk/print/services'
import _build from '@/pkg/clerk/build/services'
import _read from '@/pkg/clerk/read/services'
import cExpand from '@/pkg/clerk/expand/services'
import cGen from '@/pkg/clerk/generate/services'

const chalk = require('chalk')

export default ():void => {
    cli
    .command("", "Generate a package based on the hierarchical structure described in .pkgen.yml.")
    .action(():void => {
        (async() => {
            const isInitialize = await _print.Introduction()
            await _build.Basis()
            const isInit = await isInitialize()

            if(isInit){
                console.log(`⚠️  ${chalk.red("Couldn't find the environment require to use the pkgen command, so rebuilt it.")}`)
                return
            }
            
            cGen.Package(
                cExpand.Yaml(_read.PkgenYaml()),
                "pkg",
                _read.BaseYaml("lang"),
                _read.BaseYaml("currentTemplate")
            )

        })()
    })
}