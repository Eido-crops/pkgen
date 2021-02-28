import fs from 'fs'
const yaml = require('js-yaml')

function Config(targetField:string, configData: any, newValue: string | undefined){
    if(!newValue) return
    try {
        configData[targetField] = newValue
        const yml = yaml.safeDump(configData)
        fs.writeFileSync(`${process.env.HOME}/.pkgen/config.yml`, yml, 'utf8')
    } catch (error) {}
}

export default {
    Config
}