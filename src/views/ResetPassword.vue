<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-semibold mb-6 text-center">Reset Password</h2>

      <form @submit.prevent="handleResetPassword" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">New Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          :disabled="loading"
        >
          {{ loading ? 'Resetting...' : 'Reset Password' }}
        </button>
      </form>

      <p v-if="message" class="text-green-600 text-sm mt-3 text-center">{{ message }}</p>
      <p v-if="error" class="text-red-500 text-sm mt-3 text-center">{{ error }}</p>

      <div class="text-center mt-4">
        <router-link to="/login" class="text-blue-600 hover:underline text-sm">
          Back to Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../service/api'

const route = useRoute()
const router = useRouter()

const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const message = ref('')
const error = ref('')

const handleResetPassword = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }

  loading.value = true
  message.value = ''
  error.value = ''

  try {
    // 🧩 Route param :token comes from the email link
    const token = route.params.token
    const res = await api.put(`/users/reset-password/${token}`, { password: password.value })
    message.value = res.data.message || 'Password reset successful!'
    setTimeout(() => router.push('/login'), 2000)
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to reset password.'
  } finally {
    loading.value = false
  }
}
</script>
