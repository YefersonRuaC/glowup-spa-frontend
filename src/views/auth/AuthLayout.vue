<script setup>
    import { useRoute } from 'vue-router';

    const route = useRoute()

    const authRoutes = [
        { name: 'register', text: 'Create account' },
        { name: 'login', text: 'Log in' },
        { name: 'forgot-password', text: 'Forgot your password?' },
    ]
</script>

<template>
    <div class="flex flex-col items-center justify-center">
        <div class="flex flex-col bg-white shadow px-6 py-6 rounded-md w-full max-w-md mt-9">
        
        <RouterView />

            <nav class="flex flex-col md:flex-row justify-between items-center mt-4">
                <RouterLink
                    v-for="authRoute in authRoutes"
                    class="font-normal transition-all text-blue-500 hover:underline"
                    :to="{ name: authRoute.name }"
                    :class="{ 'hidden' : route.name === authRoute.name }"
                >
                    {{ authRoute.text }}
                </RouterLink>
            </nav>
        </div>
    </div>
</template>