import Ajax from "@/api/ajax.js"
import { apiSfingers } from "@/const.js"

export default {
    getTransactions(success, error) {
        Ajax.get(apiSfingers.Transactions, {}, {}, success, error)
    },
    insertTransaction(data, success, error) {
        Ajax.post(apiSfingers.Transactions + `/create`, data, success, error)
    },
}