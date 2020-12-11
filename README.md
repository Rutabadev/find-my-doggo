# find-my-doggo

Find the doggo that suits you (spoiler, all of them).

Made with Nuxt.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Integration tests with QA Wolf 🐺

See https://docs.qawolf.com/ for more info

### Create

Launch the app first with `yarn dev`

- Desktop : `npx qawolf create {test name}`
- Mobile : `npx qawolf create --device="Pixel 2" http://localhost:3000/{page to test} {test name}`

Then do your tests in the chromium page and go save in the terminal once you're finished.

### Run

`npx qawolf test {only test name (optionnal)}`
