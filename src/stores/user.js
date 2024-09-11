import { ref, onMounted, computed } from "vue"
import { defineStore } from "pinia"
import { useRouter } from "vue-router"
import AuthAPI from "@/api/AuthAPI"
import AppointmentAPI from "@/api/AppointmentAPI"
import api from "@/lib/axios";

export const useUserStore = defineStore('user', () => {

    const router = useRouter()
    const user = ref({})
    const userAppointments = ref([])
    const loading = ref(true)//State to avoid "flashazo" while the data of our db is being brought

    onMounted( async() => {
        try {
            const { data } = await AuthAPI.auth()
            //Authenticated user in user state
            user.value = data
            
            await getUserAppointments()
            
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
        }
    })

    async function getUserAppointments() {
        const { data } = await AppointmentAPI.getUserAppointments(user.value._id)
        // console.log(data.appointments)
        userAppointments.value = data.appointments
    }

    async function logout() {
        await AuthAPI.logout()

        localStorage.removeItem('AUTH_TOKEN')
        
        delete api.defaults.headers.common['Authorization']

        user.value = {}

        router.push({ name: 'login' })
    }

    const getUserName = computed(() => user.value?.name  ?  user.value?.name  :  '')

    const noAppointments = computed(() => userAppointments.value.length === 0)

    return {
        user,
        userAppointments,
        getUserAppointments,
        noAppointments,
        getUserName,
        logout,
        loading
    }
})