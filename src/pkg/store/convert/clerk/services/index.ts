
// 渡されたyamlDataを再帰的に読み込み全ての`hoge.foo.bar`形式のプロパティをオブジェクトに変換する
function dotPropertyToObj(yamlData: any) {
    try {
        // 全ての`hoge.foo.bar`形式のプロパティをオブジェクトに変換するまでループする
        let isContinue = true
        while (isContinue){
            isContinue = false
            for (let currentLocation of Object.keys(yamlData)){
                if(/\./.test(currentLocation)){
                    isContinue = true
                    const locations = currentLocation.split(".")
                    let currentYaml = yamlData
                    for (const [i,loc] of Object.entries(locations)) {
                        if(parseInt(i) == locations.length - 1){
                            // `hoge.foo.bar`の`bar`にあたる場合元々の`hoge.foo.bar`に入っていた値を複製
                            currentYaml[loc] = yamlData[currentLocation]
                        } else {
                            // `hoge.foo.bar`を再帰的にObjectに変換していく
                            currentYaml[loc] = {}
                            currentYaml = currentYaml[loc]
                        }
                    }

                    // 変換完了後変換元のプロパティを削除する
                    delete yamlData[currentLocation]
                }
                dotPropertyToObj(yamlData[currentLocation])
            }
        }
    } catch (error) {}

    return yamlData
}


export {
    dotPropertyToObj
}