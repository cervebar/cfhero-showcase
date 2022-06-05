
## debug
```
  yarn android:run:debugging
```
Full manual on official documentation: [https://reactnative.dev/running-on-device](https://reactnative.dev/running-on-device).

#### Debug on device:
```
adb devices
->
List of devices attached
75dd9bd07d83	device
```

#### Debug on emulator:
```
# list installed emulators (most easy with Android Studio AVD manager)
emulator -avd -list-avds
# run
emulator -avd @<EMULATOR_NAME> -netdelay none -netspeed full
```

Disconnect device. To shake Android emulator use `CMD + M`.

DISCLAIMER: needs configurations see https://stackoverflow.com/questions/26483370/android-emulator-error-message-panic-missing-emulator-engine-program-for-x86

## release
### 3. UAT internal tests
Flow for testers described in Miro: [Proces testování](https://miro.com/app/board/o9J_ktHRGeI=/)

#### a) build pipeline & upload to TestFairy
![run staging pipeline](img/run-staging-pipeline.png)
- Go to [TestFairy dashboard](https://app.testfairy.com/projects/6929189-cfherostagingreact/)
- find the latest build > goto Settings > check auto update

![enable autoupdate](img/enable-autoupdate.png)

Invited testers will be notified automatically when the new version is updated. This version can be on testers mobile phone near the production version.

#### c) Product/Dev round of testing
- the first round of testing is executed internally by product/dev people

#### d) Send notice to users
- notify testers on [SLACK release channel](https://app.slack.com/client/T5GQK39U4/CLRR2A29F)

#### e) feedback
- create issues in Jira and new branches if necessary
- merge to master (with code review)
- rebase release branch

Don't make changes directly to the release branch, this branch should be only version update with one commit.

### 4. Google Play phase
After the app is properly tested and product agreed with functionality.

#### a) run pipeline release on the release/MAJOR.MINOR.PATCH branch

![release pipeline link](img/run-release-pipeline.png "BITBUCKET release pipeline")

Successful run of pipeline.

![pipeline-2](img/pipeline-3.png "Pipelines")

> This pipeline runs `app::bundleRelease` on the project in the (TODO link environment to build script and airwe dockerhub), for details see: [bitbucket-pipelines.yml](bitbucket-pipelines.yml)

#### b) download artifact zip

![pipeline-3](img/pipeline-3.png "Download artifact zip")

#### c) Upload to Google Play - Internal testing

![testfairy-add-apk](img/release-internal.png)

- add aab bundle
- version name MAJOR.MINOR.PATCH(CODE_VERSION)
- add release notes in all languages
- wait, dev channels Google Play update occurs typically in few minutes but can be hours
- verify the right app version is available in play store
- notify testers on [SLACK release channel](https://app.slack.com/client/T5GQK39U4/CLRR2A29F)

```Ahojte verze MAJOR.MINOR.PATCH(CODE_VERSION) je připravena.```

- if any changes from testing, punish the testers, sacrifice kitten and do everything again

#### d) release to ALFA
ALFA environment is same as production, for only allowed users from whitelist in GP.
- same procedure only in ALFA channel
- check ALFA tester account cfheroapp@gmail.com, if everything went correctly
- wait :/, Google may control the app which can take 7 days, (but as we have it in Play Store already typical is 1-2 days)

#### e) release to production

- if Beta is working fine and product is aware of release, then propagate from ALFA to production.
- wait :/, Google may control the app which can take 7 days, (but as we have it in Play Store already typical is 1-2 days)

### 5. After release

#### a) save mapping.txt file
TODO: this process changed in Google,the mapping files should be added with therelease in Google Play console

- For better debugging after release add the specific code version mapping file for Proguard
- Save the mapping file from downloaded artifact from release pipeline
- from archive path: [app/build/outputs/mapping/release/mapping.txt](app/build/outputs/mapping/release/mapping.txt)
- or from path in code: [proguard/version-CODE_VERSION-mapping.txt](proguard/).
- save as `RELEASE-VERSION-mapping.txt` file to : [release/mappings/](release/mappings/) folder.

TODO: automatic way of this: https://airwe.atlassian.net/browse/CFHEROA2-37

#### b) Update code
- merge release branch to master
- tag this commit in **master**

```
git pull master
git tag -a vMAJOR.MINOR.PATCH-versionCode -m "release MAJOR.MINOR.PATCH, code version versionCode, some specific message"
// example: v1.2.1-112 release 1.2.1, code version 112, Christmas
git push --tags
```

- create next release branch

```
git checkout -b next-release
```

- update code version and version name for next release (minor if known next version, patch if unknown)
    - in [app/build.gradle](app/build.gradle)
- add SNAPSHOT to version name, so we can easily distinguish between development crashes and production errors

```
    defaultConfig {
        ...
        versionCode 136
        versionName "1.2.2(136)-SNAPSHOT"
```
- merge to master

note: any hotfix on production is done from the tagged version, but we will do our best to not to do hotfixes on production

#### c) Testing assets

- move issues from [Release Candidate](https://docs.google.com/document/u/3/d/1PnNfyLq0Eg3YvbdF7rpLxcEpO3gZf7Rf/edit?usp=drive_web&ouid=111253865721304259592&rtpof=true) document to [RELEASE - all manual tests](https://docs.google.com/document/u/3/d/1s84AV8qxK_FbK9eJB7UzQKhc63GDeagD/edit?usp=drive_web&ouid=111253865721304259592&rtpof=true)

#### d) Add build version code to Modal Message tool
Go to [Firebase production](https://console.firebase.google.com/u/0/project/cfhero-production/analytics/app/android:com.cfhero.android/overview)
Adding build version codes to the database should be done for each release but can also be done for testing builds if testing the MM is required.

To add the build version code to the MM tool add it to "Database -> Cloud Firestore > tool > versions > android" as a number array element.

![modal message add](img/mm-add.png)

#### e) Clean JIRA

* all task should be already assigned [release](https://airwe.atlassian.net/projects/CFHEROA2?selectedItem=com.atlassian.jira.jira-projects-plugin:release-page) (so we keep track what was technically in release)
    * add task to release (if not there yet)
* release

![jira-release](img/jira-release.png)

* manage tasks to the right state (most probably to DONE)

![jira-release](img/jira-release-2.png)

* close the release

#### f) update analytics docs

* if any analytics was added or changed, update the [CF Hero - analytical events versions and definitions](https://docs.google.com/spreadsheets/d/1RsNW6Z2Ws1gBb6ci1ZFWPow-uoPm2Vwo5lLk-mK9dqY)

## SOP

### Build is failing in pipeline
If you have added any library(package) then you should clear cache of pipelines in Bitbucket.
![](img/clear-cache-in-bitbucket.png)
### Release is not working as debug mode
It may be many issues, but at the very beginning look at the obfuscation and resource changes with [Proguard](https://www.guardsquare.com/manual/configuration/usage), see also Android documentation [https://developer.android.com/studio/build/shrink-code](https://developer.android.com/studio/build/shrink-code).
!!! NOTE: Proguard not enabled for now, it's messing staging build (not working with this, maybe erasing some wrong classes ಠ_ಠ).

### how to do build and TestFairy upload manually (without Bitbucekt pipeline)

1. **prepare signing keys**
   TODO - odstranit klice z gitu a distribovat jako secret
- obtain release keys
- add them to you system `$homePath/.cfhero/cf_hero_key_store`

2. **build signed staging variant**

```
  # apk
  yarn run android:assemble:staging
  ls android/app/build/outputs/apk/staging/release/
  
  # aab
  yarn run android:bundle:staging
  ls android/app/build/outputs/bundle/
```

- the key for signing is production key
- all config: [build.gradle](../android/app/build.gradle)
- environment settings used: [.env.staging](.env.staging).

**3. Update TestFairy AAB**

Upload **staging** AAB (`android/app/build/outputs/bundle/`) to [https://cfhero.testfairy.com/](https://cfhero.testfairy.com/), under user app@cfhero.cz.
