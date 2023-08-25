import {defineStore} from "pinia";

const useAdminStore = defineStore('Admin', {
    state: () => {
        return {
            fold: false,
            refresh: false
        }
    },
})

export default useAdminStore