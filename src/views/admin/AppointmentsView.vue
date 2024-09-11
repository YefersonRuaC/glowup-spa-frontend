<script setup>
    import AdminAppointment from '@/components/AdminAppointment.vue'
    import { useUserStore } from '@/stores/user';

    const user = useUserStore()
</script>

<template>
    <p class="text-gray-800 text-lg mt-4">Below you can manage your next appointments</p>

    <p v-if="user.loading" class="text-gray-700 text-2xl text-center mt-4">Loading...</p>
    <div v-else>
        <p v-if="user.noAppointments" class="text-gray-700 text-2xl text-center mt-4">
            You don't have any upcoming appointments
        </p>

        <div v-else class="grid grid-cols-1 gap-5 mt-7">
            <AdminAppointment
                v-for="appointment in user.userAppointments"
                :key="appointment._id"
                :appointment="appointment"
            />
        </div>
    </div>
</template>