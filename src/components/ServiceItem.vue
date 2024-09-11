<script setup>
    import { formatCurrency } from '../helpers';
    import { useAppointmentsStore } from '@/stores/appointments';

    const appointments = useAppointmentsStore()
    
    defineProps({
        service: {
            type: Object
        }
    })
</script>

<template>
    <div
        class="px-6 py-3 rounded-lg cursor-pointer transition-all"
        :class="appointments.isServiceSelected(service._id) ? 'bg-gray-700 text-white hover:bg-gray-800 ' : 'bg-white hover:bg-gray-200'"
        @click="appointments.onServiceSelected(service)"
    >
        <p class="text-xl font-normal">{{ service.name }}</p>
        <p 
            class="text-3xl font-black"
            :class="appointments.isServiceSelected(service._id) ? 'text-white' : 'text-green-600'"
        >{{ formatCurrency( service.price ) }}</p>
    </div>
</template>