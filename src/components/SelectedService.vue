<script setup>
    import { useAppointmentsStore } from '@/stores/appointments';
    import { formatCurrency } from '@/helpers';

    const appointments = useAppointmentsStore()

    defineProps({
        service: {
            type: Object
        }
    })
</script>

<template>
    <div class="bg-gray-700 border border-gray-600 rounded-lg p-5 flex justify-between items-center">
        <div>
            <p class="text-2xl font-bold text-white">{{ service.name }}</p>
            <p class="text-3xl font-black text-green-500">{{ formatCurrency(service.price) }}</p>
        </div>

        <button
            type="button"
            class="inline-flex items-center rounded-md bg-red-600 text-white hover:bg-red-700 text-sm px-3 py-2 font-semibold transition-all shadow-sm ring-inset ring-1 ring-red-300"
            @click="appointments.onServiceSelected(service)"
        >
            Delete
        </button>
    </div>
</template>