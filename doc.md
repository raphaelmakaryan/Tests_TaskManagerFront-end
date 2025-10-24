# JS Avancé / VueJs / Vite

## Gestion des dépendances

Comme dans d'autres languages (composer avec PHP, etc), le Javascript a aussi son système de gestion de dépendances.
Nous utiliserons `npm` pour gérer nos dépendances (d'autres existent, comme `yarn`, `pnpm`, ...).

Au lieu d'utiliser des CDN (URL vers un script hébergé en ligne), nous utiliserons maintenant `npm`.
Ce dernier va installer les dépendances dans un dossier qui s'appelle `node_modules` (équivalent du dossier `vendor` en PHP).

Voilà quelques commandes utiles :

```bash
npm install # raccourcis : npm i ; à exécuter à chaque fois qu'on démarre 
npm install <nom_du_package>
npm uninstall <nom_du_package>
```

Les dépendances sont spécifiées dans un fichier `package.json` (équivalent du fichier `composer.json` en PHP).

> [!TIP]
> Le fichier `package-lock.json` est à versionner avec GIT : il contient les versions exactes installées via `npm`

Le fichier `package.json`

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
