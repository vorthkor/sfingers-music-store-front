# Sfingers Music Store Frontend

## Index

* [Routes](#routes)
* [Project setup](#project-setup)

## Routes

### PRODUCTS

```sh
# products routes
router.use('/products', productsRoutes)

get /

post /create

put /:productID/update

delete /:productID/delete
```

### CLIENTS

```sh
# clients routes
router.use('/clients', clientsRoutes)

get /

post /create

put /:clientID/update

delete /:clientID/delete
```

### TRANSACTIONS

```sh
# transactions routes
router.use('/transactions', transactionsRoutes)

get /

post /create
```

---

### ADMINS

```sh
# admins routes
router.use('/admins', adminsRoutes)

post /login

post /create
```
**[⬆ Back to Index](#index)**

---

## Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install
```

### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev
```

### Compiles and minifies for production

```
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build
```

### Lints and fixes files

```
# yarn
yarn lint

# npm
npm run lint

# pnpm
pnpm lint
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).

**[⬆ Back to Index](#index)**

---

## Screenshots

[Project images](https://github.com/vorthkor/sfingers-music-store-front/tree/main/src/assets/screenshots)

**[⬆ Back to Index](#index)**