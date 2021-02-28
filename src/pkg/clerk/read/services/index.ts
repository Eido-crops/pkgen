import fs from 'fs'
const yaml = require('js-yaml')

function BaseYaml(field: string | null){
    try {
        const yml = fs.readFileSync(`${process.env.HOME}/.pkgen/config.yml`, 'utf8')
        const data = yaml.safeLoad(yml)
        const re = field ? data[field] : data
        return re
    } catch (error) {}
}

function PkgenYaml(){
    const yml = fs.readFileSync("./.pkgen.yml", 'utf8')
    const data = yaml.safeLoad(yml)

    return data.pkg
}

export default {
    BaseYaml,
    PkgenYaml
}