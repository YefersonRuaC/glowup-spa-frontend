<script setup>
    import Appointment from '@/components/Appointment.vue'
    import { useUserStore } from '@/stores/user'

    const user = useUserStore()
</script>

<template>
    <h2 class="text-3xl font-extrabold text-gray-800 mt-6">My appointments</h2>
    <p class="text-gray-800 text-lg mt-3">Next, you can manage your upcoming appointments</p>

    <p v-if="user.loading" class="text-gray-700 text-center mt-5 text-2xl">Loading...</p>
    <div v-else>
        <p v-if="user.noAppointments" class="text-gray-400 text-center mt-5 text-2xl">
            You do not have upcoming appointments
        </p>
        <div v-else class="grid grid-cols-1 mt-5 gap-5">
            <Appointment 
                v-for="appointment in user.userAppointments"
                :key="appointment._id"
                :appointment="appointment"
            />
        </div>
    </div>
</template>