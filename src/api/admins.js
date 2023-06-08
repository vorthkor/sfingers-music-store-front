import Ajax from "@/api/ajax.js"
import { apiSfingers } from "@/const.js"

export default {
    adminLogin(data, success, error) {
        Ajax.post(apiSfingers.Admins + `/login`, data, success, error)
    },
    adminCreate(data, success, error) {
        Ajax.post(apiSfingers.Admins + `/create`, data, success, error)
    },
}