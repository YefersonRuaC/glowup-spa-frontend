<script setup>
    import ServiceItem from '@/components/ServiceItem.vue'
    import { useServicesStore } from '@/stores/services';

    const services = useServicesStore()
</script>

<template>
    <h2 class="text-3xl font-extrabold text-gray-800 mt-3">Services</h2>
    <p class="text-gray-800 text-lg mt-3">Choose at least one service for your appointment</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        <ServiceItem 
            v-for="service in services.services"
            :key="service._id"
            :service="service"
        />
    </div>
</template>