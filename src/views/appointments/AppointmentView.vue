<script setup>
    import { ref } from 'vue';
    import VueTailwindDatePicker from 'vue-tailwind-datepicker'
    import SelectedService from '@/components/SelectedService.vue';
    import { formatCurrency } from '@/helpers';
    import { useAppointmentsStore } from '@/stores/appointments';

    const appointments = useAppointmentsStore()

    const formatter = ref({
        date: 'DD/MM/YYYY',
        month: 'MMM'
    })

    const disableDate = (date) => {
        const today = new Date()
        //Scheduled an appointment in the current month + 1 (disabling future months)
        //and disabling days 0(sunday) and 1(monday) of the week
        return date < today || date.getMonth() > today.getMonth() + 1 || [0,1].includes( date.getDay() )
    }
</script>

<template>
    <h2 class="text-3xl font-extrabold text-gray-800 mt-6">Appointment details and summary</h2>
    <p class="text-gray-800 text-lg mt-3">Check the info and confirm your appointment</p>

    <h3 class="text-3xl font-bold text-gray-800 mt-2">Services</h3>

    <p v-if="appointments.noServicesSelected" class="text-gray-600 text-2xl text-center mt-3 font-light">
        No services selected
    </p>

    <div v-else class="grid gap-5 mt-5">
        <SelectedService
            v-for="service in appointments.services"
            :key="service._id"
            :service="service"
        />

        <p class="text-right text-gray-800 text-2xl">Total to pay: 
            <span class="font-black text-green-500">{{ formatCurrency(appointments.totalAmount) }}</span>
        </p>
    </div>

    <div class="space-y-5" v-if="!appointments.noServicesSelected">
        <h3 class="text-2xl text-gray-800 font-extrabold">Date and time</h3>
        <div class="lg:flex gap-5 items-start">
            <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg p-3">
                <VueTailwindDatePicker
                    :disable-date="disableDate"
                    disable-in-range
                    as-single
                    no-input
                    :formatter="formatter"
                    v-model="appointments.date"
                />
            </div>
            <div v-if="appointments.isDateSelected" class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-4 mt-7 lg:mt-0">
                <button
                    v-for="hour in appointments.hours"
                    class="block text-gray-700 rounded-lg  text-xl font-black p-3 disabled:opacity-10 transition-all"
                    :class="appointments.time === hour ? 'bg-gray-600 text-white hover:bg-gray-500 ' : 'bg-white hover:bg-gray-200 '"
                    @click="appointments.time = hour"
                    :disabled="appointments.disableTime(hour) ? true : false"
                >
                    {{ hour }}
                </button>
            </div>
        </div>
        <div class="flex justify-end">
            <button
                v-if="appointments.isValidReservation"
                class="w-full md:w-auto rounded-lg p-3 bg-blue-600 hover:bg-blue-700 transition-all uppercase font-black text-white"
                @click="appointments.saveAppointment"
            >
                Confirm appointment
            </button>
        </div>
    </div>
</template>