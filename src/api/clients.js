import Ajax from "@/api/ajax.js"
import { apiSfingers } from "@/const.js"

export default {
    getClients(success, error) {
        Ajax.get(apiSfingers.Clients, {}, {}, success, error)
    },
    insertClient(data, success, error) {
        Ajax.post(apiSfingers.Clients + `/create`, data, success, error)
    },
    updateClient(data, success, error) {
        Ajax.put(apiSfingers.Clients + `/${data.id}/update`, data, success, error)
    },
    deleteClient(data, success) {
        Ajax.delete(apiSfingers.Clients + `/${data}/delete`, success, () => false)
    },
}