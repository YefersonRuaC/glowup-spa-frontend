<script setup>
    import { displayDate } from '../helpers/date'
    import { formatCurrency } from '../helpers';

    defineProps({
        appointment: {
            type: Object
        }
    })
</script>

<template>
    <div class="bg-gray-700 p-5 space-y-1 rounded-lg">
        <p class="text-pink-500 font-bold">
            Date: <span class="text-white font-normal"> {{ displayDate( appointment.date ) }} </span>
            Hour: <span class="text-white font-normal"> {{ appointment.time }} Hours.</span>
        </p>

        <p class="text-pink-500 font-bold">
            Customer name: <span class="text-white font-normal">{{ appointment.user.name }}</span>
            Email: <span class="text-white font-normal">{{ appointment.user.email }}</span>
        </p>

        <p class="text-white text-lg font-black">Requested services in the appointment</p>
        <div v-for="service in appointment.services" class="border border-gray-500 rounded p-4">
            <p class="text-white">{{ service.name }}</p>
            <p class="text-2xl font-black text-green-500">{{ formatCurrency( service.price ) }}</p>
        </div>

        <p class="text-white text-2xl font-black text-right mt-3">
            Total to pay: <span class="text-green-500"> {{ formatCurrency( appointment.totalAmount ) }} </span>
        </p>
    </div>
</template>