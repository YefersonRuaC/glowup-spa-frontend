<script setup>
    import { inject } from 'vue';
    import { reset } from '@formkit/core'
    import AuthAPI from '@/api/AuthAPI';

    const toast = inject('toast')

    const handleSubmit = async ({email}) => {
        try {
            const { data } = await AuthAPI.forgotPassword({email})
            // console.log(data)
            toast.open({
                message: data.message,
                type: 'success'
            })
            
            reset('forgotPassword')
            
        } catch (error) {
            // console.log(error)
            toast.open({
                message: error.response.data.error,
                type: 'error'
            })
        }
    }
</script>

<template>
    <h2 class="font-medium text-center text-xl uppercase text-gray-800">Forgot password</h2>
    <p class="font-medium text-center text-md text-gray-600 mt-2">Recover your account access</p>

    <FormKit
        id="forgotPassword"
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
        
        <FormKit type="submit">Send instructions</FormKit>
    </FormKit>
</template>