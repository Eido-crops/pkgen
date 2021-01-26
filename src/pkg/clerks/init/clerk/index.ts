import standard from 'figlet/importable-fonts/Standard'
const figlet = require("figlet")
const shell = require('shelljs')
const spinner = require('ora')()

figlet.parseFont('Standard', standard)
spinner.color = "green"


async function greet(){
    let isInitialized = false
    if(
        !shell.test("-e", `${process.env.HOME}/.pkgen`) ||
        !shell.test("-e", `${process.env.HOME}/.pkgen/config.yml`) ||
        !shell.test("-e", `${process.env.HOME}/.pkgen/template`) ||
        !shell.test("-e", "./pkg") ||
        !shell.test("-e", "./.pkgen.yml")
    ){
        await new Promise((r) => {
            figlet("Pkgen", function(err:any, data:any) {
                if (err) {
                    console.log(err)
                }
                console.log(data)
                r("service greet")
            })
        })
        isInitialized = true
    }
    return async () => {
        return isInitialized
    }
}

async function buildEnvironment(){

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

    if(!shell.test("-e", "./pkg")) {
        shell.mkdir("./pkg")
        await new Promise(r => {
            spinner.start()
            spinner.text = "Add the pkg directory to the current directory..."
            setTimeout(r, 3000)
        })
        await new Promise(r => {
            spinner.stop()
            r("service make outpost dir")
        })
    }

    if(!shell.test("-e", "./.pkgen.yml")) {
        shell.exec(`echo "pkg:" > ./.pkgen.yml`)
        await new Promise(r => {
            spinner.start()
            spinner.text = "Add the .pkgen.yml file to the current directory..."
            setTimeout(r, 3000)
        })
        await new Promise(r => {
            spinner.stop()
            r("service make outpost yaml")
        })
    }

}

export default {
    Services: () => ({
        greet,
        buildEnvironment
    })
}