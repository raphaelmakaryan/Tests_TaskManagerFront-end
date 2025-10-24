# frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


## Technical choices

Visit https://2024.stateofjs.com/en-US/libraries/testing/.

## Présentation 

https://github.com/AlbanCrepel/Tests_TaskManagerFront-end

Intro 2ème partie : https://docs.google.com/document/d/1HHHIxzGaYnWhE-HV4oCtvVhzLGo1JANC/edit#heading=h.4d34og8

https://play.vuejs.org/

```vue
<template>
    <h1>{{ message }}</h1> 
    <input placeholder="produit" v-model="currentProduct.label"/>
    <input type="number" :placeholder="pricePlaceholder" v-model="currentProduct.price"/>
    <!--<p>{{ text }} {{ message }} {{ cart[0]}} {{ user.firstName }}</p>-->
    <!--<div><span v-for="item in cart">{{ item }},</span></div-->
    <button @click="addProduct">Add product</button>
    <ul>
        <cart-item v-for="(item, index) in cart" :item="item" @delete="deleteItem(index)"/>
    </ul>
    {{ totalPrice }}
</template>

<script>
    import CartItem from "./CartItem.vue"

    export default {
        name: "MyComponent",
        components: {CartItem},
        data() {
            return {
                message: "Salut",
                pricePlaceholder: "prix",
                text: "some text",
                user: {firstName: "Alban"},
                currentProduct: {label: "", price: 0},
                cart: []
            }
        },
        computed: {
            totalPrice() {
                return this.cart.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)
            }
        },
        methods: {
            addProduct() {
                console.log(this.currentProduct)
                this.cart.push({...this.currentProduct})
                this.currentProduct.label = ""
                this.currentProduct.price = 0
            }, deleteItem(index) {
                this.cart.splice(index, 1)
            }
        },
        mounted() {
            console.log("salut")
            this.cart.push({label: "pomme", price: 2})
        }
    }
</script>

<style scoped>
    h1 {
        color: red;
    }
</style>
```


```vue
<template>
  <li> {{ item.label }} ({{ item.price }}€)
    <button @click="removeItem">x</button>
  </li>
</template>

<script>
  export default {
    name: "CartItem",
    props: {
      item: {type: Object}
    },
    methods: {
      removeItem() {
        this.$emit("delete")
      }
    }
  }

</script>

<style scoped>
  li {
    font-weight: bold
  }
</style>
```



```vue
<template>
    <main>
        <h1>{{ title }}</h1>
        <ul>
            <li v-for="user in users">{{ user.name.first }}</li>
        </ul>
    </main>
</template>

<script>
    import axios from "axios"

    export default {
        data() {
            return {
                title: "Home", 
                users: []
            }
        },
        methods: {
            async fetchUsers() {
                const result = await axios.get("https://randomuser.me/api/?results=10")
                this.users = result.data.results
            }
        },
        async mounted() {
            await this.fetchUsers()
        }
    } 

</script>
```
