import api from "../lib/axios";

export default {
    register(data) {
        return api.post('/register', data)
    },
    verifyAccount(token) {
        return api.get(`/verify/${token}`)
    },
    login(data) {
        return api.post('/login', data)
    },
    auth() {
        return api.get('/user')
    },
    admin() {
        return api.get('/admin')
    },
    forgotPassword(data) {//data is the email that user put in the field
        return api.post('/forgot-password', data)
    },
    verifyPasswordResetToken(token) {
        return api.get(`/forgot-password/${token}`)
    },
    updatePassword(token, data) {
        return api.post(`/forgot-password/${token}`, data)
    },
    logout() {
        return api.post('/logout')
    }
}