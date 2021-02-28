import fs from 'fs'

function TemplateList(){
    const allDirents = fs.readdirSync(`${process.env.HOME}/.pkgen/template/`, { withFileTypes: true })
    
    return allDirents
    .filter(dirent => dirent.isDirectory())
    .filter(({ name }) => !/^\./.test(name))
    .map(({ name }) => name)
}

function LangList(templateName: string){
    const allDirents = fs.readdirSync(`${process.env.HOME}/.pkgen/template/${templateName}/`, { withFileTypes: true })

    return allDirents
    .filter(dirent => dirent.isDirectory())
    .filter(({ name }) => !/^\./.test(name))
    .map(({ name }) => name)
}

export default {
    TemplateList,
    LangList
}