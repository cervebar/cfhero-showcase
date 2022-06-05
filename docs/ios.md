
**Versions:**
- yarn : 1.22.10
- node : > v16.14.0
- nvm : v0.35.3
- Xcode : 13
- React Native : 0.64.2
- OS : Big Sur
- Until Oct 2021 only for iOS, you need a MacBook 🍎 \
  (Android/java version [here](https://bitbucket.org/airwesolutions/))


## Getting Started

```bash
# install homebrew (https://brew.sh/) and run:
brew install nvm # node version manager
echo "read the output of ^^^ command and edit your ~/.zshrc"
echo "try nvm --version" 
brew install git # version control system
brew install git-lfs # large files support for .PNGs etc.
brew install --cask react-native-debugger

git clone ...

# in project folder:
git checkout master
git lfs install --force
git lfs pull
 
nvm install
nvm use
npm i -g yarn
yarn install
yarn devsetup

brew install cocoapods
cd ios
pod install
cd ..
# on MacBook M1 run: 
# arch -x86_64 pod install
## and follow https://dev.to/frafajec/react-native-ios-on-m1-mac-2ia0

# run the project
# (Add this simu using xcode. We need smallest screen.)
yarn run ios --device="iPhone SE (1st generation)"

# to use React Native debugger run this
REACT_DEBUGGER="open -g 'rndebugger://set-debugger-loc?port=8081' ||" yarn run ios --simulator="iPhone SE (1st generation)"
# or just `yarn iosd`
# (Then just use Device > Shake, and select "Debug") 
# (See also https://github.com/zbycz/rn-perf-talk)
```

Also see czech version with some helpful thoughts: [install.md](install.md)

---
**pozn.:** Je možné, že po čerstvé instalaci XCode nástrojů nebudou na simulátoru některá zařízení k dispozici (např. iPhone SE 1. generace). Je však možné taková zařízení doinstalovat/vytvořit přímo v Simulator (viz. obrázky):

![](img/simulator-new1.png)
![](img/simulator-new2.png)
---

### Versions:
- node: see [.nvmrc](./.nvmrc)
- yarn: 1.22.10
- Xcode: 12.5.1 (important!)
- Homebrew >= 2.6.0

### Debuging React Native

The app is set up to use `redux-devtools-extension` store enhancer. This enables us to debug Redux actions in a very
convenient way. _It is recommended that you use a standalone debugger to inspect the state of application_.

For React Native the recommended debugger is
**[react-native-debugger](https://github.com/jhen0409/react-native-debugger).** You can install it easily (CFHero project is written in react-native v0.64+ so we need to install v0.11 of RN debugger):

```bash
brew install --cask react-native-debugger
```

## Development

### Run project
0. ensure .env is set for development

1. run Xcode

WARN: open the right project, open Xcode, then in ios folder click on xcode project (otherwise it will mess up everything)

2. install dependencies (needed at first run or when new library is added)
```
yarn install
cd ios && pod install
```

NOTE: first build of app takes approx 60min \(ಠ╭╮ಠ)/

3. run React debugger

```bash
# You can set it as default debugger when running the app
REACT_DEBUGGER="open -g 'rndebugger://set-debugger-loc?port=8081' ||" yarn run ios

# ...and specify also with the version of a device simulator
REACT_DEBUGGER="open -g 'rndebugger://set-debugger-loc?port=8081' ||" yarn run ios -- --simulator="iPhone SE"

# Or you can open it manually
open "rndebugger://set-debugger-loc?host=localhost&port=8081"
```

3b) run app

```
yarn run ios
```


## 🕊 Release 🕊

### 0. Prerequisites
- 1) signing configurations and valid certificates, which are in separate repo: [ios-certificates](https://bitbucket.org/airwesolutions/ios-certificates/src/master/). Follow README there.
- 2) `.env.staging` and `.env.production` are in the root path with correct values (see section ***Create .env files***)
- 3) paired telephone for the digit code (TODO how to pair telephone)
- 4) you are added as developer to AppStore connect or have credetials for hello@airwe.cz user.

The release pipeline is defined in [ios/fastlane/Fastfile](ios/fastlane/Fastfile). Here you could configure the whole proces. Do not modify, unless you really know what are you doing.

#### EXPIRED CERTIFICATES
Certificate expires each year, if this happens (`Your certificate 'Z75JJJPFH5.cer' is not valid, please check end date and renew it if necessary`) renew it.

```bash
cd ios
# 1) delete provisioning profiles from certificate repo
fastlane match nuke development 
fastlane match nuke distribution
# 2) recreate certificates again
fastlane match development
fastlane match appstore
fastlane match adhoc #not needed now, only for future purpose
```

Restart XCode, it should be there automatically update.

notes:
- more info: [how to renew expired certificate with fastlane](https://stackoverflow.com/questions/56179677/how-to-renew-expired-certificate-with-fastlane)
- check ceritificates  [developer account for Airwe](https://developer.apple.com/account/resources/profiles/list)
- [ios-cerificates repo](https://bitbucket.org/airwesolutions/ios-certificates/src/master/README.md)

#### 1. Release can be done only from clean master branch (for hotfixes see release hotfix)

a) update version in [package.json](package.json) before and merge to master

b) then start from clean master
```
git checkout master
git pull
```

##### Release hotfix
!!! Apply only when can't release from master.
edit [ios/fastlane/Fastfile](ios/fastlane/Fastfile) and comment this row
```
 ensure_git_branch(branch: 'master')
 ->
 #ensure_git_branch(branch: 'master')
```

then do release as usual and don't forget to merge this branch to master back after release.

#### 2. Release to staging first.

##### 2a)
```
cd ios
fastlane staging
```

##### 2a) enter authorization digit code from paired telephone
When the interval in releases is high,the digit code must be reentered:
`Please enter the 6 digit code:`
- here you must enter the code from the paired telephone (it can take some time, when it arrives)

![auth1.png](img/auth1.png)
![auth1.png](img/auth1.png)

#### 2c) enter the version name
`What marketing version? <enter to keep it at 1.1.4>`
- update to MAJOR.MINOR.PATCH

#### 2d) wait
The bg_default_inhalation_fluttering takes about 45minutes 🙄 (so you can do another task, or study something).

### 3. Staging app is uploaded
- Go to [AppStore connect](https://appstoreconnect.apple.com/login?targetUrl=%2Fapps&authResult=FAILED) from your account or from hello@airwe.cz (2 phase authentication code from phone will be is required)
- CFHero staging -> tab **TestFlight**
- wait for build is ready (about 10 mintes 🙄)

![appstore connect testflight](img/appstore-testflight.png)

#### 3b) upload eventually DSym files if neccessary

Upload symbols to Firebase:
```
./Pods/FirebaseCrashlytics/upload-symbols -gsp CFHero/Firebase/Staging/GoogleService-Info-stag.plist  -p ios ~/Library/Developer/Xcode/Archives/<PATH_TO_dSYM_FILE>
# example ./Pods/FirebaseCrashlytics/upload-symbols -gsp CFHero/Firebase/Staging/GoogleService-Info-stag.plist  -p ios ~/Library/Developer/Xcode/Archives/2021-02-17/CF\ Hero\ 2021-02-17\ 10.51.21.xcarchive/dSYMs/`
```

- see Firebase documentation [Get deobfuscated crash reports with the Firebase Crashlytics SDK](https://firebase.google.com/crashlytics/get-deobfuscated-reports?platform=ios&authuser=0)

### 4. Testing phase
- you are first tester, update the app in your phone and test it
  ![](img/update.png)

- [Release Candidate document](https://docs.google.com/document/d/1XXrf20vH9bQc5khFbqTUoMlRLovjbJEiVb6HiuWdG2c/edit)
- [MIRO testing board](https://miro.com/app/board/o9J_kh7B5lw=/)
- second tester is a product owner, notice app is ready
- after all ok -> notice testers to test app

### 5. Production release

#### 5a) Build and push release version via fastlane
```
cd ios
fastlane production
```

`What marketing version? <enter to keep it at 1.2.0>`
- keep the version name as is, because it's already set when the staging version is released

#### 5b) AppStore

- 1. go to AppStore
     ![](img/app-store-release-1.png)
- 2. prepare version information with all assets / or use the previous build
    - needed is new version info (common for all languages) and "What's new" text for all language (both will be publicly seen in AppStore)
    - release notes are prepared by product, if not ask them: languages: <cs-CZ>, <sk-SK>
    - don't forget to keep terms in [Poeditor CFHERO](https://poeditor.com/projects/) synced.

- 3. choose the right build
     ![](img/appstore-release-2-build.png)
- 4. choose the release option  **manual**
     ![](img/app-store-release-3-manual.png)

- 5. submit to review
- 6. wait ٩(˘◡˘)۶, it takes some time for app to be reviewed by Apple, usual for not new release is **1 day**
     ![](img/appstore-release-4-confirm-message.png)

#### 5d) After app is approved ✊(❛‿❛✿)✊

- 1) if [mailer function](https://bitbucket.org/airwesolutions/cfhero-firebase-mailer/src/master/) needs to be updated, deploy it before release
- 2) **submit app to appstore**

![error1.png](img/app-store-release-5-submit.png)

## PostRelease

### Tag released code version
```
git tag --list
git tag -a v1.2.0-88-prod -m "1.2.0 (88) production, SK release and small fixes"
git push --tags
```
- note: staging tags are done automatically
    - TODO make it also for production [JIRA task CFHEROA2-590](https://airwe.atlassian.net/browse/CFHEROA2-590)

### Organize project
- close all issues, log time spent
- close [release in JIRA](https://airwe.atlassian.net/projects/CFHEROA2?selectedItem=com.atlassian.jira.jira-projects-plugin%3Arelease-page)

### Upload debug symbols for Crashlytics

We are solving this:
![error1.png](img/app-release-dsym-1.png)


- **1) download DSym files**
    - go to XCode -> Window -> Organizer -> Archives
    - find the build version and download debug symbols (it will look like nothing happened)

![error1.png](img/app-release-xcode.png)

- **2) find DSym file**:
    - it is quit hidden for BFU users of Mac
    - in CLI type `open /Users/USER/Library` example:`open /Users/babu/Library`
    - then you can find it in path: `~/Library/Developer/XCode/Archives/<DATE_RELEASE_CREATED>` for example `CF Hero 2020-11-22 09.56.53.xcarchive`
    - right click on archive and **show package content**
    - go to `dSyms` folder
    - file we are looking for looks similar like `3486eebe-f857-365e-8d7b-f7a4438d8c9b.dSYM`
    - this folder is the right one


- **3) upload DSym file** to Crashlytics:

- choose BUILD-TYPE

```
cd cfhero-react/ios
./Pods/FirebaseCrashlytics/upload-symbols -gsp CFHero/Firebase/BUILD-TYPE/GoogleService-Info-BUILD-TYPE.plist  -p ios ~/PATH_TO_DSYM
```

- which plist projects to choose: `ls CFHero/Firebase/`
    - staging: CFHero/Firebase/Staging/GoogleService-Info-stag.plist
    - production: CFHero/Firebase/Production/GoogleService-Info-prod.plist

example:
```
./Pods/FirebaseCrashlytics/upload-symbols -gsp CFHero/Firebase/Staging/GoogleService-Info-stag.plist  -p ios ~/Library/Developer/Xcode/Archives/2021-02-17/CF\ Hero\ 2021-02-17\ 10.51.21.xcarchive/dSYMs/
```
output:
![error1.png](img/app-release-upload-dsym.png)

- to read more about this:
    - [Get deobfuscated crash reports with the Firebase Crashlytics SDK](https://firebase.google.com/crashlytics/get-deobfuscated-reports?platform=ios&authuser=0)
    - http://hongchaozhang.github.io/blog/2015/08/17/the-dSYM-file-in-ios-project/
    - https://stackoverflow.com/questions/11880404/dsym-file-from-device

- **4) wait** it takes about 30minutes to be in Crashyltics
- navigate to correct Firebase project

### update analytics docs

* if any analytics was added or changed, update the [CF Hero - analytical events versions and definitions](https://docs.google.com/spreadsheets/d/1RsNW6Z2Ws1gBb6ci1ZFWPow-uoPm2Vwo5lLk-mK9dqY)

### Update libraries and tools
Good practise is AFTER successful release update anything is possible, so we keep the code somehow up-to-date and have time to fix possible problems (right after release).

WARN: Jop, but this thing stoped working :( ... so update only when necessary. Good luck.

Run:
`sudo gem install fastlane`

### Clean JIRA

* all task should be already assigned to [release](https://airwe.atlassian.net/projects/CFHEROA2?selectedItem=com.atlassian.jira.jira-projects-plugin:release-page) (so we keep track what was technically in release)
    * add task to release (if not there yet)
* release

![jira-release](img/jira-release.png)

* manage tasks to the right state (most probably to DONE)

![jira-release](img/jira-release-2.png)

## UPDATE
**disclaimer ** this is not ultimate guide how to update/upgrade, next time improve this. But it will be painfull.

Run clean:
```
yarn clean
```
- interactive script:

```
Wipe iOS build folder? (Y/n) y
Wipe iOS Pods folder? (Y/n) y
Wipe system iOS Pods cache? (Y/n) y
Wipe user iOS Pods cache? (Y/n) y
Update pods? (Y/n) y
Wipe android build folder? (Y/n) n
Clean Android project? (Y/n) n
Wipe node_modules folder? (Y/n) n
Update brew? (Y/n) n
```

Delete node modules by hand (just for to be relly sure):
```
rm -rf node_modules/
```

Install newest node modules in root folder:
```
yarn
```

Update Cocoapods (>1.10):

```
sudo gem update cocoapods
```

Install pods
```
cd ios
pod install --repo-update
````

check if it works
```
cd ..
yarn run ios
```

## Related projects
- [mailer function](https://bitbucket.org/airwesolutions/cfhero-firebase-mailer/src/master/)

## Conventions
- Keep code as simple as possible (°ロ°)☝.
- documentation is part of development too

### Git commit messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 100 characters or less. Ideally, the message should fit to 72 characters.

## File naming convention

The naming convention for files that we should follow is:

- CamelCase (upper) for files containing React components or JavaScript classes (e.g. `HomeContainer.tsx`)
- camelCase (lower) for all the other files (e.g. `kidsFetcher.ts`)
- Design assets (e.g. images, videos), should use hyphens for separating multi-word names (e.g. `splash-icon.png`)
- Tests should have exactly the same name as the file being tested (e.g. `reducer.ts` should have test named `reducer.spec.js`, while `Home.ts` should have test named as `Home.spec.js`)

## Update

Disclaimer: It's always painful, do not take this too strictly, it depends on a lot of things.


- yarn clean
- interaktivni skript:

```
Wipe iOS build folder? (Y/n) y
Wipe iOS Pods folder? (Y/n) y
Wipe system iOS Pods cache? (Y/n) y
Wipe user iOS Pods cache? (Y/n) y
Update pods? (Y/n) y
Wipe android build folder? (Y/n) n
Clean Android project? (Y/n) n
Wipe node_modules folder? (Y/n) n
Update brew? (Y/n) n
```

rucne smazat node modules, tim si budem enejvice jisti,ze je smazana, kdyz pak dame yarn tak se vytvori znova
```
rm -rf node_modules/
```

- v root slozce, naistalujeme znovau node modules nejnovejsi
  yarn


Coocapods >1.10:
pokud nemam tak
sudo gem update cocoapods

cd ios
pod install --repo-update

overit ze to funguje
cd ..
yarn run ios

## Troubleshooting
### DB error accessing build database
**problem** after run: `REACT_DEBUGGER="open -g 'rndebugger://set-debugger-loc?port=8081' ||" yarn run ios`
![error1.png](img/error1.png)

**solution**: restart again or clean Xcode project

### Too many rerenders
For debuging you can use script [whyDidYouUpdate.txt](debug/whyDidYouUpdate.txt). Change to .ts (eslint) and add to component as a hook.

### Build fail:


#### Unexpected token I in JSON at position 0
```
2021-07-11 10:24:22.669 simctl[5175:263858] CoreSimulator detected version change.  Framework version (757.5) does not match existing job version (732.18.6).  Attempting to remove the stale service in order to add the expected version.
error Could not get the simulator list from Xcode. Please open Xcode and try running project directly from there to resolve the remaining issues.
SyntaxError: Unexpected token I in JSON at position 0
at JSON.parse (<anonymous>)
at runOnSimulator (/Users/babu/cfhero/dev/cfhero-react/node_modules/@react-native-community/cli-platform-ios/build/commands/runIOS/index.js:167:23)
at Object.runIOS [as func] (/Users/babu/cfhero/dev/cfhero-react/node_modules/@react-native-community/cli-platform-ios/build/commands/runIOS/index.js:121:12)
at Command.handleAction (/Users/babu/cfhero/dev/cfhero-react/node_modules/@react-native-community/cli/build/index.js:186:23)
at Command.listener (/Users/babu/cfhero/dev/cfhero-react/node_modules/commander/index.js:315:8)
at Command.emit (events.js:198:13)
at Command.parseArgs (/Users/babu/cfhero/dev/cfhero-react/node_modules/commander/index.js:651:12)
at Command.parse (/Users/babu/cfhero/dev/cfhero-react/node_modules/commander/index.js:474:21)
at setupAndRun (/Users/babu/cfhero/dev/cfhero-react/node_modules/@react-native-community/cli/build/index.js:265:24)
at Object.run (/Users/babu/cfhero/dev/cfhero-react/node_modules/@react-native-community/cli/build/index.js:206:11)
```

**solution**:
- ensure correct versions of yarn, nvm, Xcode
- clean Xcode project cached files
    - Xcode: product -> clean build folder
    - Xcode: file -> workspace settings -> click on Derive data folder -> delete content of folder
    - => `yarn run ios`

### Build fail:

It's this issue: https://github.com/facebook/react-native/issues/31698

```javascript
cd ios
pod install
```

Do not commit your path in `Local PodSpecs`!

### XCode build fail because `node` binary has not been found
- Create a [symlink to the node binary](https://stackoverflow.com/a/50419734/1769254)  
  `sudo ln -s $(which node) /usr/local/bin/node`

#### wrong paths in podspecs user/babu/
This can be related to issue with 0.64.2 and cocoapods
https://github.com/facebook/react-native/issues/31121

**solution**:
After every pull the `pod install` command has to be called to overwrite Pods/Local Podspecs/ full paths.

## Expo packages
- We are using the [Expo bare workflow](https://docs.expo.dev/introduction/managed-vs-bare/#bare-workflow)
- To install an Expo package run `npx expo install expo-package` as per the [documentation](https://docs.expo.dev/bare/installing-expo-modules/#using-expo-sdk-packages)


# fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

### bump_major

```sh
[bundle exec] fastlane bump_major
```



### bump_minor

```sh
[bundle exec] fastlane bump_minor
```



### bump_patch

```sh
[bundle exec] fastlane bump_patch
```



----


## iOS

### ios staging

```sh
[bundle exec] fastlane ios staging
```



### ios production

```sh
[bundle exec] fastlane ios production
```



----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
