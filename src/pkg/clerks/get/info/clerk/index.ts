import fs from 'fs'
const yaml = require('js-yaml')

function getBaseYaml(){
    return (field: string | null) => {
        try {
            const yml = fs.readFileSync(`${process.env.HOME}/.pkgen/config.yml`, 'utf8')
            const data = yaml.safeLoad(yml)
            const re = field ? data[field] : data
            return re
        } catch (error) {}
    }
}
function getTemplateList(){
    const allDirents = fs.readdirSync(`${process.env.HOME}/.pkgen/template/`, { withFileTypes: true })
    
    return allDirents
    .filter(dirent => dirent.isDirectory())
    .filter(({ name }) => !/^\./.test(name))
    .map(({ name }) => name)
}
function getLangList(){
    const allDirents = fs.readdirSync(`${process.env.HOME}/.pkgen/template/${getBaseYaml()("currentTemplate")}/`, { withFileTypes: true })

    return allDirents
    .filter(dirent => dirent.isDirectory())
    .filter(({ name }) => !/^\./.test(name))
    .map(({ name }) => name)

}
function getOutpostYaml(){
    const yml = fs.readFileSync("./.pkgen.yml", 'utf8')
    const data = yaml.safeLoad(yml)

    return data.pkg
}

export default {
    Services: () => ({
        getBaseYaml,
        getTemplateList,
        getLangList,
        getOutpostYaml
    })
}