instalace nvm
https://github.com/nvm-sh/nvm#installing-and-updating
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

zkontrolovat .bash_profile

je potreba pro Xcode prilinkovat node
```
ln -s $(which node) /usr/local/bin/node
```

# instalace nodu

```
nvm install v10.19.0
```

:prepiname pomoci nvm use

# instalace yarn


```
brew install yarn --ignore-dependencies
 nebo:
```
```
brew install yarn
brew uninstall --ignore-dependencies node
```
# instalace watchmen

```
brew list
brew install watchmen
```

# instalace XCode

# instalce React Native

https://reactnative.dev/docs/environment-setup

Nebudeme psat v Expu, pouzijeme React Native CLI Quickstart


# instalace React Native debuggeru (0.11.4)
https://github.com/jhen0409/react-native-debugger

```
brew cask install react-native-debugger
```

# cocoapods
https://cocoapods.org/
sudo gem install cocoapods


# projekt

instlaace React zavislosti (Javascriptove zavislosti) ze souboru package.json

```
clone project
cp <PROJECT>/.env.sample <PROJECT>.env
yarn install
```

# instalace iOS Podu

packaging system pro iOS
```
cd ios
pod install
```

# MAC
defaultni terminal ma defaultni shell zsh, je ptoteba jej zmenit na bash
 viz. obrazek

# nastaveni provisioning profilu
do XCode 
Xcode -> Preferences -> accounts -> add acount -> Apple ID -> heslo pro hello@airwe.cz
2.fazova autentikace, mame na telefonu domacim

Nas vyvojarsky ucet pro development se jemnuje Barbora Cervenkova (nevime proc)

- bude potreba dotahnout podpisoveho certifikatu pro provisioning profile

# potreba dotahnout distribucni certifikat

1. naistalovat fastlane (2.160)

```
brew install fastlane
```

2.
certifikaty jsou ulozene: https://bitbucket.org/airwesolutions/ios-certificates/src

potrebujeme pridat certifikaty do tohodle repo

```
cd <PROJECT>/ios
fastlane match development
Passphrase for Match storage: NASE SPECIFICKE
Password (for hello@airwe.cz): APPLE ID
2 fazove overeni
Password for login keychain: heslo do kompu,root
```

PIC- vysledek

```
fastlane match appstore
```

vypnout,zapnout xcode, nekolikrat, overit si ze v keychain je certifikat

heslo jsme dali stejne jako appleid, ale je to nase (teorticky muze byt i jine)

PIC: jak vypadaji certifikaty v Keychain a Xcode

# spustime projekt

```
yarn run ios
```

konkretni device:
```
yarn run ios --simulator="iPhone 8"
```

s debuggerem
```
REACT_DEBUGGER="open -g 'rndebugger://set-debugger-loc?port=8081' ||" yarn run ios --simulator="iPhone 11"
```

## debuger
debuger je ve spotlitu

v simulatoru: Device -> Shake -> debug (v appce)


#troubleshoot

## je to neco s: javaskriptove, ReactNative
-> smazat slozku node-modules -> yarn install

## JavaSkript knihovny, ktere maji souvislost s nativnima vecma
(maji v sobe bridge, treba lottie)
-> cd ios -> rm podfile.lock -> pod install

jine: cd ios -> pod deintegrate -> pod install

## Xcode
1. product -> clean build folder
2. Xcode -> Preferences -> tab Locations -> Derived Data -> Finder -> smazat obsah slozky Derived Data (2 slozky)


# tips & tricks
pokazdy kdyz si pullnu tak dat yarn install
