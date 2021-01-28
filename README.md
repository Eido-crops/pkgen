# Pkgen

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
    clerks:
        generate:
            package:
                clerk: # パッケージの生成に関する処理
        get:
            info:
                clerk: # yamlファイルの読み込みなどの処理
        init:
            clerk: # コマンドを利用する為の初期処理
        update:
            clerk: # yamlファイルの上書きなど更新処理
    
    env: # パスなど共通して利用する情報
```

## Installation

```
curl -O -L https://github.com/overgrow-crops/pkgen/releases/download/v0.1/pkgen
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
