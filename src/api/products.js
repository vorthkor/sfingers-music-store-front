import Ajax from "@/api/ajax.js"
import { apiSfingers } from "@/const.js"

export default {
    getProducts(success, error) {
        Ajax.get(apiSfingers.Products, {}, {}, success, error)
    },
    insertProduct(data, success, error) {
        Ajax.post(apiSfingers.Products + `/create`, data, success, error)
    },
    updateProduct(data, success, error) {
        Ajax.put(apiSfingers.Products + `/${data.id}/update`, data, success, error)
    },
    deleteProduct(data, success) {
        Ajax.delete(apiSfingers.Products + `/${data}/delete`, success, () => false)
    },
}