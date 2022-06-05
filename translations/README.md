# import/export/transform scripts for CFHero transaltions
## PoEditor
[PoEditor CFHero project](https://poeditor.com/projects/view?id=409139)

### Export language
- choose format JSON (NOT key-value!)
- download and save to folder `transaltions`

## Script
### prerequisities
Node: v14.16.0
Yarn: 1.22.10

```
yarn install
```

### run

- Import from PoEditor terms to React Native json format.

```
cd scripts
./index.js po2ios ../languages/CFHero_Czech.json  ../../src/translations/cs.json
```
