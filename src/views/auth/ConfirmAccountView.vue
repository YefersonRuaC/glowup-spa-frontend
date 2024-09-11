<script setup>
    import { onMounted, inject } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import AuthAPI from '@/api/AuthAPI';

    const toast = inject('toast')
    const route = useRoute()
    const router = useRouter()

    const { token } = route.params
    
    onMounted(async () => {
        try {
            const { data } = await AuthAPI.verifyAccount(token)
            // console.log(data)
            toast.open({
                message: data.message,
                type: 'success'
            })

            setTimeout(() => {
                router.push({name: 'login'})
            }, 5000);

        } catch (error) {
            toast.open({
                message: error.response.data.error,
                type: 'error'
            })
        }
    })
</script>

<template>
    <h2 class="font-medium text-center text-xl uppercase text-gray-800">Verify account</h2>
</template>