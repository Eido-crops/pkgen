const chalk = require('chalk')
const shell = require('shelljs')


function Package(schema: any, footprint: string, lang: string, template: string){
    try {
        for (let currentLocation of Object.keys(schema)) {

            let path = `${footprint}/${currentLocation}/${schema[currentLocation]}`
            path = path.replace("null", "").replace("[object Object]", "")
        
            if(!shell.test("-e", path)){
                shell.mkdir(path)
                if(schema[currentLocation] == null){
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