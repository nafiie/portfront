<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-semibold mb-6 text-center">Forgot Password</h2>

      <form @submit.prevent="handleForgotPassword" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          :disabled="loading"
        >
          {{ loading ? 'Sending...' : 'Send Reset Link' }}
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
import api from '../service/api'

const email = ref('')
const loading = ref(false)
const message = ref('')
const error = ref('')

const handleForgotPassword = async () => {
  loading.value = true
  message.value = ''
  error.value = ''

  try {
    // 📨 This should match your backend route (e.g. POST /api/users/forgot-password)
    const res = await api.post('/users/forgot-password', { username: email.value })
    message.value = res.data.message || 'Reset link sent to your email.'
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to send reset email.'
  } finally {
    loading.value = false
  }
}
</script>
