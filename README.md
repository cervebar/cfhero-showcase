# DISCLAIMER - ONLY SHOWCASE VERSION !!!

This code is only for showcase purpose, 80% of code and all image assets were removed.

Code base started 2019.
 
Credits for this code and that app is up and running goes to all developers who once was or still are a part of CFHero ❤️. 

# CFHero React Native

- [iOS](docs/ios.md)
- [Android](docs/android.md)

## Development

### Test project
We use [JEST](https://jestjs.io/) framework
to run test do: `yarn test`

### Develop analytics
For development of analytics to be faster and seen uncomment lines under `if (isDebugEnv)` in [src/middleware/analytics/logEvents.ts](src/middleware/analytics/logEvents.ts).

### Terms, lanaguages
For easier translation we use [POEditor](https://poeditor.com/projects/view?id=409139).

Process for new texts:
1) get text from product (typically from some excel file)
2) develop
3) review with product
4) add term to PoEditor (terms) in format `namespace__subnamespace__termname` (delimiter is `__`)

example:
  ```json
    "store": {
         "buyPopup": {
            "title": "Chceš ho za {{price}}?"
         ...}
       ...}
  => store__buyPopup__title
  ```
5) add all languages  
6) now there are two options:  
    a) run the import and conversion scripts in one go using the following commands:
    ```bash
    cd translations/scripts
    yarn install
    yarn start
    ```  
    a.1) on subsequent runs you can just run the script from root of the project:
    ```bash
    yarn import-translations
    ```
    b) (**deprecated**) or treat yourself to a manual way  
    b.1) download (each language separately) in term JSON format, save to [translations/languages/](translations/languages/)  
    ![auth1.png](docs/img/export-poeditor.png)  
    b.2) re-generate for all languages
    
    ```bash
    cd translations/scripts
    yarn install
    ./convertAllLanguages.sh
    ```

#### Troubleshooting
#### Windows line endings
- Cloning the repository with Windows line endings will result in the two following errors:
```bash
$ ./convertAllLanguagesIOS.sh
zsh: ./convertAllLanguagesIOS.sh: bad interpreter: /bin/bash^M: no such file or directory
```
```bash
$ ./convertAllLanguagesIOS.sh
converting CFHero_Slovak.json to sk.json
env: node\r: No such file or directory
```
- Convert the shell and node scripts to Unix line endings using `dos2unix` utility:
```bash
$ dos2unix convertAllLanguagesIOS.sh
dos2unix: converting file convertAllLanguagesIOS.sh to Unix format...
$ dos2unix ./index.js
dos2unix: converting file ./index.js to Unix format...
```

WARN: PoEditor files are the source of truth, what isn't in its own format doesn't exist in code as the file is generated from this first.



## preparing images

### SVG to PNG
From svg we convert it with this script: [utils-scripts/svg2drawables.sh](utils-scripts/svg2drawables.sh)

```
# example generate all from folder easter
./svg2drawables.sh ../svg/theme/easter/ ../assets/images/
```

How it is matched to Android/iOS devices.
```
1x: mdpi Android devices (160 dpi)
1.5x: hdpi Android devices (240 dpi)
2x: Phone 4, 4S, 5, 5c, 5s, 6, xhdpi Android devices (320 dpi)
3x: iPhone 6 plus, xxhdpi Android devices (480 dpi)
3.5x: Nexus 6 (560dpi): in-between xxhdpi and xxxhdpi, will scale down xxxhdpi
```
Images source: [Google Drive: Grafika a UI assety](https://drive.google.com/drive/u/1/folders/1WR5ULx3l1e72JGqUNaFCA3T9PxS2Cp--)

### PNG to WebP
We use the following script for PNG to WebP conversion: [utils-scripts/png2webp.sh](utils-scripts/png2webp.sh)
Also, you have to have the `cwebp` utility installed
**Trailing directory slashes are important**

```
# Example: Convert all png assets to webp
cd utils-scripts
./png2webp-dir.sh ../png/images/ ../assets/images/
# Example: Convert select images to webp
./png2webp.sh icon_ig.png icon_fb.jpg ../../assets/images/
# Or from the root of the project
yarn convert-to-webp icon_ig.png icon_fb.jpg assets/images/
```

## Related projects

### Firebase modal messaging app
- Producer of modal messages: https://bitbucket.org/airwesolutions/fcm-tool

