<script setup>
    import { RouterLink, RouterView, useRoute } from 'vue-router';
    import { useUserStore } from '@/stores/user';

    const user = useUserStore()

    const route = useRoute()
</script>

<template>
    <div class="flex justify-between mt-4">
        <p class="text-gray-600 text-xl underline">Hi: {{ user.getUserName }}</p>
        <div class="flex flex-col space-y-2">
            <div class="flex gap-6 items-center justify-end">
                <button
                    type="button"
                    class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase transition-all rounded font-extrabold"
                    @click="user.logout"
                >
                    Log out
                </button>
            </div>
            <nav class="flex gap-3 items-center justify-end">
                <RouterLink
                    :to="{name: 'my-appointments'}"
                    class="p-3 text-white uppercase text-xs font-black rounded transition-all"
                    :class="route.name === 'my-appointments' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 text-gray-900 hover:bg-gray-400'"
                >
                    My appointments
                </RouterLink>
                <RouterLink
                    :to="{name: 'new-appointment'}"
                    class="p-3 text-white uppercase text-xs font-black rounded  transition-all"
                    :class="route.name === 'new-appointment' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 text-gray-900 hover:bg-gray-400'"
                >
                    New appointment
                </RouterLink>
            </nav>
        </div>
    </div>
    <main>
        <RouterView />
    </main>
</template>