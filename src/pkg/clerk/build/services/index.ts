const shell = require('shelljs')
const spinner = require('ora')()

spinner.color = "green"

async function Basis(){

    if(!shell.test("-e", `${process.env.HOME}/.pkgen`)) {
        shell.mkdir(`${process.env.HOME}/.pkgen/`)
        await new Promise(r => {
            spinner.start()
            spinner.text = "creating a .pkgen directory in your home directory..."
            setTimeout(r, 3000)
        })
        await new Promise(r => {
            spinner.stop()
            r("service make base dir")
        })
    }

    if(!shell.test("-e", `${process.env.HOME}/.pkgen/config.yml`)) {
                        
        const configYml:string = `lang: '@golang'\ncurrentTemplate: '@default'` 

        shell.exec(`echo "${configYml}" > ${process.env.HOME}/.pkgen/config.yml`)
        await new Promise(r => {
            spinner.start()
            spinner.text = "creating a pkgen config file in your home directory..."
            setTimeout(r, 3000)
        })
        await new Promise(r => {
            spinner.stop()
            r("service make base yaml")
        })
    }

    if(!shell.test("-e", `${process.env.HOME}/.pkgen/template`)) {
        shell.exec(`git clone git@github.com:overgrow888/pkgen-template.git ${process.env.HOME}/.pkgen/template`)
    }

    if(!shell.test("-e", "./pkgen.yml")) {
        shell.touch("./pkgen.yml")
        await new Promise(r => {
            spinner.start()
            spinner.text = "Add the pkgen.yml file to the current directory..."
            setTimeout(r, 3000)
        })
        await new Promise(r => {
            spinner.stop()
            r("service make outpost yaml")
        })
    }

}

export default {
    Basis
}