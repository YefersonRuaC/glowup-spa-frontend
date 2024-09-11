<script setup>
    import { formatCurrency } from '@/helpers';
    import { displayDate } from '@/helpers/date';
    import { useAppointmentsStore } from '@/stores/appointments';

    const appointments = useAppointmentsStore()

    defineProps({
        appointment: {
            type: Object
        }
    })
</script>

<template>
    <div class="bg-gray-700 space-y-1 rounded-lg p-5">
        <p class="text-pink-500 font-bold">
            Date: <span class="font-normal text-white">{{ displayDate(appointment.date) }}</span>
            Hour: <span class="font-normal text-white">{{ appointment.time }}</span>
        </p>

        <p class="text-lg font-black text-white">Services requested in the appointment</p>
        <div
            v-for="service in appointment.services"
            class="border border-gray-500 rounded p-4"
        >   
            <p class="text-white">{{ service.name }}</p>
            <p class="text-2xl font-black text-green-500">{{ formatCurrency(service.price) }}</p>
        </div>

        <div class="flex flex-col md:flex-row items-center justify-between px-1">
            <div class="mt-4">
                <RouterLink
                    :to="{ name: 'edit-appointment', params: { id: appointment._id } }"
                    class="bg-blue-600 rounded-lg p-3 text-white text-center text-sm uppercase font-bold flex-1 md:flex-none hover:bg-blue-700 transition-all mr-4"
                >
                    Edit appointment
                </RouterLink>
    
                <button
                    class="bg-red-600 rounded-lg p-3 text-white text-center text-sm uppercase font-bold flex-1 md:flex-none hover:bg-red-700 transition-all"
                    @click="appointments.cancelAppointment(appointment._id)"
                >
                    Cancel appointment
                </button>
            </div>
            <div class="mt-4">
                <p class="text-2xl text-white font-black">
                    Total to pay: <span class="text-green-500">{{ formatCurrency(appointment.totalAmount) }}</span>
                </p>
            </div>
        </div>
    </div>
</template>