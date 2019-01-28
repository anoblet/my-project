# my-app
Init tasks:
  npm i && lerna bootstrap

Scaffolding includes:
  * Lerna (To manage reusable components/mixins)
  * Redux (Generic actions, simple reducers to act as types)
  * Redux state maps to Firebase (Compononent is mapped to reducer) delays render
  * Task scheduler system delays render until promises resolve (firebase auth, firebase sync)
  * Installable as an app
  * Separation of concerns -- seperate template files, sass-loader
  * (100) score in all 5 Lighthouse scorings

  @todo
    - Testing (Code coverage)
