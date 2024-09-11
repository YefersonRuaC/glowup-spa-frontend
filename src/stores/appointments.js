import { computed, onMounted, ref, inject, watch } from "vue"
import { defineStore } from "pinia"
import { useRouter } from 'vue-router'
import AppointmentAPI from "@/api/AppointmentAPI"
import { convertToISO, convertToDDMMYYYY } from "@/helpers/date"
import { useUserStore } from "./user"

export const useAppointmentsStore = defineStore('appointments', () => {

    const appointmentId = ref('')
    const services = ref([])
    const date = ref('')
    const time = ref('')
    const hours = ref([])
    const appointmentsByDate = ref([])

    const toast = inject('toast')
    const router = useRouter()

    const user = useUserStore()

    //Available schedule for appointments
    onMounted(() => {
        const startHour = 10
        const endHour = 19

        for(let hour = startHour; hour <= endHour; hour++) {
            hours.value.push(`${hour}:00`)
        }
    })

    //Watching every time that the date state is changed
    watch(date, async() => {
        //Always that date state make a change, reset time state
        time.value = ''
        if(date.value === '') return
        
        const { data } = await AppointmentAPI.getByDate(date.value)

        if(appointmentId.value) {
            //Enabling the hour that user selected before, to give the option to keep the same hour
            appointmentsByDate.value = data.filter(appointment => appointment._id !== appointmentId.value)
            
            const appointmentTime = data.filter(appointment => appointment._id === appointmentId.value)[0]

            if (appointmentTime && appointmentTime.time) {
                time.value = appointmentTime.time
            }
            // console.log(time.value);
        } else {
            appointmentsByDate.value = data
        }
    })

    function setSelectedAppointment(appointment) {
        // console.log(appointment)
        services.value = appointment.services
        date.value = convertToDDMMYYYY(appointment.date)
        time.value = appointment.time
        appointmentId.value = appointment._id
    }

    function onServiceSelected(service) {
        //Prevent duplicated services
        if(services.value.some(selectedService => selectedService._id === service._id)) {
            
            services.value = services.value.filter(selectedService => selectedService._id !== service._id)
            
        } else {
            if(services.value.length === 2) {
                alert('Two services per appointment maximum')
                return 
            }
            //Add the service selected to the services array
            services.value.push(service)
        }
    }
    
    async function saveAppointment() {
        const appointment = {
            services: services.value.map( service=> service._id ),
            date: convertToISO(date.value),//Formatting date
            time: time.value,
            totalAmount: totalAmount.value
        }

        if(appointmentId.value) {
            try {
                const { data } = await AppointmentAPI.update(appointmentId.value, appointment)
                // console.log(data)
                toast.open({
                    message: data.message,
                    type: 'success'
                })
    
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const { data } = await AppointmentAPI.create(appointment)
                // console.log(data)
                toast.open({
                    message: data.message,
                    type: 'success'
                })
    
            } catch (error) {
                console.log(error)
            }
        }
        //When appointment is saved
        resetAppointmentData()
        user.getUserAppointments()
        router.push({ name: 'my-appointments' })
    }

    function resetAppointmentData() {
        appointmentId.value = ''
        services.value = []
        date.value = ''
        time.value = ''
    }

    async function cancelAppointment(id) {
        if(confirm('Do you want to cancel this appointment?')) {
            try {
                const { data } = await AppointmentAPI.delete(id)
                // console.log(data)
                toast.open({
                    message: data.message,
                    type: 'success'
                })
                //After appointment is canceled, show changes automatically (without reload the page)
                user.userAppointments = user.userAppointments.filter(appointment => appointment._id !== id)
                
            } catch (error) {
                toast.open({
                    message: error.response.data.message,
                    type: 'error'
                })
            }   
        }
    }

    const isServiceSelected = computed(() => {
        return (id) =>  services.value.some(service => service._id === id)
    })

    const noServicesSelected = computed(() => services.value.length === 0)

    const totalAmount = computed(() => {
        return services.value.reduce((total, service) => total + service.price, 0)
    })

    const isValidReservation = computed(() => {
        //If we have, a service at least in the services array, date and time. Returns true
        return services.value.length && date.value.length && time.value.length
    })

    const isDateSelected = computed(() => {
        return date.value ? true : false
    })

    //Using return to be able to pass a param in computed method
    const disableTime = computed(() => {
        return (hour) => {
            return appointmentsByDate.value.find(appointment => appointment.time === hour)
        }
    })

    return {
        services,
        date,
        hours,
        time,
        setSelectedAppointment,
        onServiceSelected,
        isServiceSelected,
        noServicesSelected,
        totalAmount,
        isValidReservation,
        saveAppointment,
        resetAppointmentData,
        cancelAppointment,
        isDateSelected,
        disableTime
    }
})