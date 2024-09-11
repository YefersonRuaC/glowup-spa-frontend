<script setup>
    import { onMounted } from 'vue';
    import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
    import AppointmentAPI from '@/api/AppointmentAPI';
    import { useAppointmentsStore } from '@/stores/appointments';

    const appointments = useAppointmentsStore()
    const route = useRoute()
    const router = useRouter()

    const { id } = route.params

    onMounted(async() => {
        try {
            const { data } = await AppointmentAPI.getById(id)
            // console.log(data.appointment)
            appointments.setSelectedAppointment(data.appointment)

        } catch (error) {
            router.push({ name: 'my-appointments' })
        }
    })
</script>

<template>
    <nav class="my-5 flex gap-3">
        <RouterLink
            :to="{name: 'edit-appointment'}"
            class="flex flex-1 text-center items-center justify-center font-extrabold p-3 uppercase rounded text-white transition-all"
            :class="route.name === 'edit-appointment' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 text-gray-900 hover:bg-gray-400'"
        >
            Services
        </RouterLink>

        <RouterLink
            :to="{name: 'edit-appointment-details'}"
            class="flex-1 text-center font-extrabold p-3 uppercase rounded text-white transition-all"
            :class="route.name === 'edit-appointment-details' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 text-gray-900 hover:bg-gray-400'"
        >
            Appointment and summary
        </RouterLink>
    </nav>

    <RouterView />
</template>