const shell = require('shelljs')
const spinner = require('ora')()

spinner.color = "green"

function AsciiArt(){
    const AA = `  ____  _                    
 |  _ \\| | ____ _  ___ _ __  
 | |_) | |/ / _\` |/ _ \\ '_ \\ 
 |  __/|   < (_| |  __/ | | |
 |_|   |_|\\_\\__, |\\___|_| |_|
            |___/`

    console.log(AA)
}

async function Introduction(){
    let isInitialize = false
    if(
        !shell.test("-e", `${process.env.HOME}/.pkgen`) ||
        !shell.test("-e", `${process.env.HOME}/.pkgen/config.yml`) ||
        !shell.test("-e", `${process.env.HOME}/.pkgen/template`) ||
        !shell.test("-e", "./pkgen.yml")
    ){
        AsciiArt()
        isInitialize = true
    }
    return async () => {
        return isInitialize
    }
}

export default {
    Introduction,
    AsciiArt
}