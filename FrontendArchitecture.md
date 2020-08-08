# ![ ](https://bitbucket.org/Frontend-Domun/publicdomun/raw/b55bdc9d5aaed155cdbdba56f014e58a2de33441/img/icons/favicon-32x32.png) Domun Client Frontend Architecture

## Directories

 Directory    | Description
 :----------- |:-----------
 public       |  Assets will simply be copied and not go through "webpack" and are referenced via absolute paths For example:Favicon, icons for PWA, robots.txt
 src          | Main source folder for all vue components served by webpack
 tests        | Jest tests for Vue.js application and components

### Main Vue /src Directories

 Directory     | Description
 :------------ |:-----------
 assets | Any assets that are imported into your components
 components | All the components of the projects that are not the main views, helps with separation, testing and reuse
 mixins | Mixins to be reused in different components
 router | All the routes of your projects (in my case I have them in the index.js). Basically in Vue.js everything is a component. But not everything is a page. A page has a route like “/dashboard”, “/settings” or “/search”. If a component has a route it is routed.
 store | Vuex constants in mutation-type.js
 translations | Locales files for use with Vue-i18n
 views | All pages in the website should have a view that then may or may not include other components.

### Main Vue files

File          | Description
:------------ |:-----------
App.js | Main page file that defines main styles and the main page structure of Header, Content and Footer
utils.js | Infrequently used utility methods not worthy of mixins, regex value testing, constants or filters etc. They should be imported like this: import { uuid } from "@/utils.js";
main.js | Entry point to the app loading Veutify, routes, stores etc using the above structure. Also configures webpack, PWA (Progressive Web App)Google Analytics etc.

### Main Vue Components

File          | Description
:------------ |:-----------
/components/templates/Header | Header - common across whole site. Any variants are handled inside the component and it displays a separate mobile and desktop navigation. It uses `<nav class="mobileNav hidden-md-and-up">` with a `<v-navigation-drawer>` for mobile and `<nav class="desktopNav">` with a `<v-toolbar>` and a `<v-menu class="hidden-md-and-up">` for desktop navigation
/components/templates/Content | The main content gets loaded here
/components/templates/Footer | Footer - common across whole site. Any variants are handled inside the component

## Key points to note

### Content.js

Content.js uses `<router-view />` to display the page required, and also adds support for `</v-snackbar>` alerts

---
Last updated 14/09/2019
