import cli from '@/cmd/cac'
import { INITIALIZED_MSG } from '@/config'

import _print from '@/pkg/clerk/print/services'
import _build from '@/pkg/clerk/build/services'
import _read from '@/pkg/clerk/read/services'
import _expand from '@/pkg/clerk/expand/services'
import _gen from '@/pkg/clerk/generate/services'

export default ():void => {
    cli
    .command("", "Generate a package based on the hierarchical structure described in pkgen.yml.")
    .action(():void => {
        (async() => {
            const isInitialize = await _print.Introduction()
            await _build.Basis()
            const isInit = await isInitialize()

            if(isInit){
                console.log(INITIALIZED_MSG)
                return
            }
            
            _gen.Package(
                _expand.Yaml(_read.PkgenYaml()),
                "./",
                _read.BaseYaml("lang"),
                _read.BaseYaml("currentTemplate")
            )

        })()
    })
}