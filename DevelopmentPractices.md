# ![ ](https://bitbucket.org/Frontend-Domun/publicdomun/raw/b55bdc9d5aaed155cdbdba56f014e58a2de33441/img/icons/favicon-32x32.png) Domun Development Practices

## Development Practices

Adhere to best practice. When you come across bad code, refactor it, if you spot bad design, code smells or know a better way of doing something flag to team and raise a ticket.

## Development Practices

Adhere to best practice. When you come across bad code, refactor it, if you spot bad design, code smells or know a better way of doing something flag to team and raise a ticket.


### Document as you go

'Nuff said? Document to the level of a knowledgeable programmer, with business domain understanding

### Use feature branching for checkin

Use lower case and with a known preamble at the beginning:

```code
feature   Feature I'm adding or expanding
bug       Bug fix or experiment
junk      Throwaway branch created to experiment
```

For example:

```bash
call git checkout -b feature/jwt-authentication
```

Means you can easily do:

```bash
git branch --list "features/*"
```

*Note:* there is a convenience `branch.bat`, you can keep calling it until you are happy to merge to master it. Then you can call  `merge-branch.bat` and if no conflicts then call `master.bat`

### Pull requests

1) Run the code manually to make sure it works
2) Make sure tests document all changes
3) Add tags to the pull request
4) Update status of user story in jira task or spreadsheet and link to pull request
5) Add reference to user story in pull request
6) Update the change log if not done automatically
7) Request a review via slack and email

### Externalise

Large JS files are unwieldy, so split off into separate modules where sensible.

For example see `guards.js` it creates a function and exports the functions this module wants to expose:

```javascript
import X from "y";

function guardBeforeEach(to, from, next) {
  // Do Stuff 
}

export default {
  guardBeforeEach
};
```

It can then be used in `main.js` by importing the module and calling its functions:

```javascript
import Guard from "@/router/guards";
router.beforeEach((to, from, next) => {
  Guard.guardBeforeEach(to, from, next);
});
```


### Security
On login, sign up and register a JWT token is created server-side and written to a HTTP only, secure cookie. The payload contains the user record (minus the hashed password)

If a route is secure it must be marked with

```json
    meta: {
    requiresAuth: true
    },
```

Before going to a routes that have this flag, a call to `/api/v1/verify` will check if the JWT token in the cookie is valid. At the moment (22/09/2019) it calls `/api/v1/auth` which calls the DB usg teh suid an checks a record exists.
In these API calls, nothing needs to be sent as the Axios backed API services pass in `withCredentials: true`

#### TODO: Security

- [x] Authentication is handled by a JWT in a session cookie
- [x] Add cookie support to express
- [x] Add withCredentials: true to service calls so axios saves cookies
- [x] Enabled Cors for express and alowed * for access control leaders
- [x] Removed Nginx Access-Control-Allow-Origin * for http://local-casafi6.firmview.co.uk/my-account/dashboard
- [x] Added requiresAuth to routes
- [x] Client main configure vue router to test route for requiresAuth and if no ___ct cookie go to login
- [x] Client.main added support for forward to original URl after login
- [x] In client npm install --save js-cookie
- [x] Added signing options to server AuthenticationController
- [x] Logout removes jwt
- [x] fix casafi and domun nginx after release
- [] Stop passing token in sign up/register/login json and decide my account on the cookie var
- [] Set expire to be 10 mins as each action refreshes it
- [] Add secure to cookie creation so https is forced
- [] Investigate support for SameSite to cookie creation so its forced
- [] In JWT signing workout what the audience flag should be
- [] Use process.env.JWT_SECRET to set the private key on a per server basis
- [] OAuth, facebook and twitter login
- [] Put something else in the user object we can check for, maybe every user has a key, consider
- [] Put in something that changes, i.e. the date (have to deal with midnight though get date take expiry time off it, if still same day use it otherwise use the date you just calculated )
- [] Think about having another key / JWT token for refreshing the original one
- [] Forgot password flow
- [] Encrypt all sign up data in DB
- [] Encrypt local storage
- [] Secure nodeJs server API calls with auth checks
- [] Secure go lang API calls with auth checks
- [] Rate limiter
- [] SQl injection protection
- [] XSS protection
- [] WAF
- [] Pen test
- [] GDPR
- [] Audit Reporting

---
Last updated 22/09/2019
