<script setup>
    import { onMounted, inject, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import AuthAPI from '@/api/AuthAPI';

    const toast = inject('toast')
    const route = useRoute()
    const router = useRouter()

    const { token } = route.params
    const validToken = ref(false)

    onMounted( async() => {
        try {
            const { data } = await AuthAPI.verifyPasswordResetToken(token)
            // console.log(data)
            validToken.value = true
            
        } catch (error) {
            toast.open({
                message: error.response.data.error,
                type: 'error'
            })
        }
    })

    const handleSubmit = async( password  ) => {

        password.password_confirmation = password.password_confirm

        try {
            const { data } = await AuthAPI.updatePassword(token, password)
            toast.open({
                message: data.message,
                type: 'success'
            })

            setTimeout(() => {
                router.push({name: 'login'})
            }, 3000);

        } catch (error) {
            toast.open({
                message: error.response.data.error,
                type: 'error'
            })
        }
    }

</script>

<template>
    <div v-if="validToken">
        <h1 class="font-medium text-center text-xl uppercase text-gray-800">New password</h1>
        <p class="font-medium text-center text-md text-gray-600 mt-2">Enter your new password</p>
    
        <FormKit
            id="newPasswordForm"
            type="form"
            :actions="false"
            incomplete-message="all fields must be filled out correctly."
            @submit="handleSubmit"
        >
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
            
            <FormKit type="submit">Save changes</FormKit>
        </FormKit>
    </div>

    <p v-else class="text-center text-2xl font-black text-gray-300">Not valid token</p>
</template>