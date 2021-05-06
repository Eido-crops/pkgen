# pkgen

pkgenは非常にシンプルなパッケージジェネレーターです。  
プロジェクトルートに作成された.pkgen.ymlにパケージの階層を表現し  
`pkgen`を実行することで`$HOME/.pkgen/template`の中の任意のテンプレートを基に  
パッケージを生成します。  
テンプレートの選択は`pkgen template`で行うことができます。  
`$HOME/.pkgen/template`に任意の名称のテンプレートを作成することで、  
カスタムテンプレートを作る事も出来ます。


例えば、下記のようなyamlファイルを書き、`pkgen`を実行すると  
[こちら](./src/pkg)のようなディレクトリが生成されます。

```yaml
pkg:
    # パスなど共通して利用する情報
    env:

    clerk:
        # pkgenコマンドを実行するための環境を構築する
        build.services:
            ## pkgenコマンドの実行環境基盤を構築する
            # Basis():void

        # コンソールにメッセージを表示する
        print.services:
            ## コマンドの実行に必要な環境が無い場合にコンソールに表示、初期化が必要かを返す関数を返す。
            # Introduction()():bool

        # コマンドの実行によって行われるパッケージの生成に関する処理
        generate.services:
            ## pkgen.ymlの構造を再起的に読み込みパッケージを生成
            # Package(schema: any, footprint: string, lang: string, template: string):void

        # ファイルの内容を読み込む
        read.services:
            ## $HOME/.pkgen/config.ymlを読み込む、フィールド名を指定すれば指定したフィールドの値を返す。
            # BaseYaml(field: string | null):any

            ## ./.pkgen.ymlを読み込む
            # PkgenYaml():any

        # ファイル以外からの情報を取得
        get.services:
            ## $HOME/.pkgen/template直下のディレクトリ名一覧をテンプレート一覧として取得
            # TemplateList():any
            
            ## $HOME/.pkgen/.pkgen/template/選択中テンプレート直下のディレクトリ名一覧をプログラミング言語一覧として取得
            # LangList(templateName: string):any

        # 別構造へと展開
        expand.services:
            ## yamlファイルの`foo.bar`のような構造をオブジェクト構造に完全に展開し展開済みオブジェクトを返す
            # Yaml(yamlData: any):any
        
        # $HOME/.pkgen/config.ymlの更新
        update.services:
            ## $HOME/.pkgen/config.ymlの更新
            # Config(targetField:string, configData: any, newValue: string | undefined):void

```

## Installation

```
curl -O -L https://github.com/mingle-crops/pkgen/releases/download/v0.2.0/pkgen
chmod +x ./pkgen
mv ./pkgen /usr/local/bin
```

## Documents

### pkgen
`.pkgen.yml`に記述した階層構造を基に`pkg`ディレクトリ下にパッケージを生成します。  

### pkgen lang
選択中のテンプレート内のプログラミング言語別テンプレートを選択します。

### pkgen template
テンプレートを選択します。
