const chalk = require('chalk')
const shell = require('shelljs')


function Package(schema: any, footprint: string, lang: string, template: string){
    try {
        for (let currentLocation of Object.keys(schema)) {
            // 意図せぬ再帰処理を防ぐ
            if(currentLocation == '0') return

            // ツリー構造の終端であるかを判断
            const isEnd = schema[currentLocation] == null
            || /\,/.test(schema[currentLocation])
            || typeof(schema[currentLocation]) == 'string'

            let path = (isEnd)
                     ? `${footprint}/${currentLocation}/null`
                     : `${footprint}/${currentLocation}/${schema[currentLocation]}`
            path = path.replace(".//", "").replace("null", "").replace("[object Object]", "")

            if(!shell.test("-e", path)){
                shell.mkdir(path)
                if(isEnd){
                    shell.cp("-R", `${process.env.HOME}/.pkgen/template/${template}/${lang}/*`, path)
                    console.log(`${chalk.green.bold("[generate]")} to ${chalk.yellow(path)}`)
                }
            }

            Package(
                schema[currentLocation],
                `${footprint}/${currentLocation}`,
                lang,
                template
            )
        }
    } catch (error) {}
}

export default {
    Package
}