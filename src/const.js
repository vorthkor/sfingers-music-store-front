const VUE_APP_SFINGERS_API = "http://localhost:3344"

const apiSfingersBase = VUE_APP_SFINGERS_API

export const apiSfingers = {
    Products: apiSfingersBase + "/products",
    Clients: apiSfingersBase + "/clients",
    Transactions: apiSfingersBase + "/transactions",
}
