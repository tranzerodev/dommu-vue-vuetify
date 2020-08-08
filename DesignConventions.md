# ![ ](https://bitbucket.org/Frontend-Domun/publicdomun/raw/b55bdc9d5aaed155cdbdba56f014e58a2de33441/img/icons/favicon-32x32.png) Domun Design Conventions

## My Account area vs Public pages

The navigation changes between my account and the public site. this is controlled by setting a vuex store variable `setInMyAccount` in the  `mounted` life cycle method:

```javascript
mounted() {
    this.$store.dispatch("setInMyAccount", true);
},
```

Any component can now test for it with:

```html
<p v-if="$store.state.isInMyAccount">
    .
    .
</p>
```

## Populating pages with data

Local Session Storage is used to store a json object that has nodes for each of the main data sources it is accessed via Vuex. Local Storage must not be used as it is permanent. You can view the current data for the currently registering or logged on user easily using chrome's developer tools and looking under Application -> storage -> session Storage -> <http://local-casafi6.firmview.co.uk/>

To read from session storage to populate the vue model for the current page, The convention to adhere to is to call: `fillData` in the `created` life cycle method:

```javascript
created() {
    this.fillData();
}
```

Then the `fillData` methods loads a node out of the vuex store and deep clones it to the local data in the component

```javascript
methods: {
    fillData() {
        if (this.$store.state.registration) {
            this.registration = clonedeep(this.$store.state.registration);
        }
    }
}
```

The component's main data structure has a registration node and a search node if they have progressed that far. This means all the data about a user is easily available to the component.

```javascript
export default {
  data() {
    return {
      registration: {
        personalDetails: {},
        addressDetails: {},
        mortgageDetails: {},
        jointDetails: {},
        employmentDetails: {},
        avmDetails: {},
        avmReportDetails: {}
      },
      search: {
        filter: {},
        currentProduct: {},
        initialSearch: {},
        lastSearch: {},
        savedSearches: {}
      }
    };
  }
}
```

## Inputs and updating vue state

Vuetify fields and controls should be used where ever possible. Typically the input is bound to the view state using v model and it maps to the underlying vuex data structure.

In Addition there is usually a on change event which can be use to call google analytics event tracking code.

```html
<v-text-field
    label="Email Address"
    type="text"
    v-model="registration.personalDetails.email"
    @change="onChange($event)"
/>
```

## Services

The Client is written with an API first design in mind. Any external calls to 3rd party APIs or internal calls to the Casafi Database. Must be done via REST like API calls via the service package. 

For example:

Service                     | Description
:-------------------------- |:-----------
AuthenticationService.js    | Provides login, registration, auth and verify services
AvmService.js               | Provides property valuation services
EmailService.js             | Provides email sending services
MortgageService.js          | Provides Mortgage search services
PostcodeService.js          | Provides address lookup services

The Vue code calls services by first importing them

```javascript
import PostcodeService from "@/services/PostcodeService";
```

And then calling them

```javascript
PostcodeService.getAddresses(val)
```

*NOTE* AS the services are asynchronous they must be called via a promise

For example:

```javascript
        MyService.doStuff(val)
          .then(response => {
            // process stuff
          })
          .catch(e => {
            console.log("There was an error calling MyService: " + e);
          });
```

## Panel

Most pages,have a panel component which is then used to frame pages and provides a simple wrapper that will allow us to change the look and feel of all pages quickly. It is declared with:

```javascript
import Panel from "@/components/Panel.vue";

export default {
  name: "MyPage",
  components: {
    "panel-card": Panel
  }
  .
  .
  .
```

Which is then used to hold the page content:

```html
<panel-card
    id="panelTitle"
    title="My Panel Title"
    sizes="xs12 sm12 md12"
>
    .
    .
</panel-card>
```

---
Last updated 21 /09/2019
