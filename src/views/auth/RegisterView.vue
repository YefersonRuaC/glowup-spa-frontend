<script setup>
    import { inject } from 'vue';
    import { reset } from '@formkit/vue';
    import AuthAPI from '../../api/AuthAPI';

    const toast = inject('toast')

    const handleSubmit = async ( formData ) => {
        //password_confirmation: Laravel password confirmation
        //password_confirm: Formkit password confirmation
        formData.password_confirmation = formData.password_confirm;

        try {
            const { data } = await AuthAPI.register(formData)
            // console.log(data)
            toast.open({
                message: data.message,
                type: 'success'
            })
            
            reset('registerForm')//Formkit reset inputs

        } catch (error) {
            toast.open({
                message: error.response.data.message,
                type: 'error'
            })
        }
    }
</script>

<template>
    <h2 class="font-medium text-center text-xl uppercase text-gray-800">Create account</h2>
    <FormKit
        id="registerForm"
        type="form"
        :actions="false"
        incomplete-message="all fields must be filled out correctly."
        @submit="handleSubmit"
    >
        <FormKit 
            type="text"
            label="Name"
            name="name"
            placeholder="Enter your full name"
            validation="required|length:3"
        />

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
            placeholder="Enter your password - At least 8 characters"
            validation="required|length:8"
        />

        <FormKit 
            type="password"
            label="Repeat password"
            name="password_confirm"
            placeholder="Enter your repeat password"
            validation="required|confirm"
        />

        <FormKit type="submit">Submit</FormKit>
    </FormKit>
</template>