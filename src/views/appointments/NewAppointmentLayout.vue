<script setup>
    import { onMounted } from 'vue';
    import { RouterLink, RouterView, useRoute } from 'vue-router';
    import { useAppointmentsStore } from '@/stores/appointments';

    const route = useRoute()
    const appointments = useAppointmentsStore()

    onMounted(() => {
        appointments.resetAppointmentData()
    })
</script>

<template>
    <nav class="my-3 flex gap-3">
        <RouterLink
            :to="{name: 'new-appointment'}"
            class="flex flex-1 text-center items-center justify-center font-extrabold p-3 uppercase transition-all rounded"
            :class="route.name === 'new-appointment' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-900 hover:bg-gray-400'"
        >
            Services
        </RouterLink>

        <RouterLink
            :to="{name: 'appointment-details'}"
            class="flex-1 text-center font-extrabold p-3 uppercase transition-all rounded"
            :class="route.name === 'appointment-details' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-900 hover:bg-gray-400'"
        >
            Appointment and summary
        </RouterLink>
    </nav>

    <RouterView />
</template>