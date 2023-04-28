# Sfingers Music Store Frontend

## Routes

PRODUCTS

```sh
// products routes
router.use('/products', productsRoutes)

get /

post /create

put /:productID/update

delete /:productID/delete
```

CLIENTS

```sh
//clients routes
router.use('/clients', clientsRoutes)

get /

post /create

put /:clientID/update

delete /:clientID/delete
```

TRANSACTIONS

```sh
//transactions routes
router.use('/transactions', transactionsRoutes)

get /

post /create
```

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
