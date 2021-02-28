import standard from 'figlet/importable-fonts/Standard'
const figlet = require("figlet")
const shell = require('shelljs')
const spinner = require('ora')()

figlet.parseFont('Standard', standard)
spinner.color = "green"

async function Introduction(){
    let isInitialize = false
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
        isInitialize = true
    }
    return async () => {
        return isInitialize
    }
}

export default {
    Introduction
}