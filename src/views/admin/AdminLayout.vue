<script setup>
    import { useUserStore } from '../../stores/user'

    const user = useUserStore()
</script>

<template>
    <div class="flex justify-between mt-4">
        <div>
            <p class="text-gray-600 text-xl underline">Hi: {{ user.getUserName }}</p>
            <h3 class="text-xl lg:text-3xl font-black text-gray-800 mt-1">Admin panel</h3>
        </div>

        <div>
            <button
                type="button"
                class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase font-extrabold rounded transition-all"
                @click="user.logout"
            >
                Log out
            </button>
        </div>
    </div>
    <main class="space-y-6">
       <RouterView />
    </main>
</template>