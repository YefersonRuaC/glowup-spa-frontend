<script setup>
    import { inject } from 'vue';
    import { useRouter } from 'vue-router';
    import AuthAPI from '@/api/AuthAPI';

    const toast = inject('toast')
    const router = useRouter()

    const handleSubmit = async ( formData ) => {
        try {
            const  { data: { token } } = await AuthAPI.login(formData)
            // console.log(token)
            localStorage.setItem('AUTH_TOKEN', token)
            
            router.push({ name: 'my-appointments' })

        } catch (error) {
            toast.open({
                message: error.response.data.message,
                type: 'error'
            })
        }
    }
</script>

<template>
        <h2 class="font-medium text-center text-xl uppercase text-gray-800">Login To Your Account</h2>
        <FormKit
            id="loginForm"
            type="form"
            :actions="false"
            incomplete-message="all fields must be filled out correctly."
            @submit="handleSubmit"
        >
            <FormKit 
                type="email"
                label="Email"
                name="email"
                placeholder="Enter your email"
                validation="required|email"
            />
            <FormKit 
                type="password"
                label="Password"
                name="password"
                placeholder="Enter your password"
                validation="required|length:8"
            />
            <FormKit type="submit">Log in</FormKit>
        </FormKit>
</template>