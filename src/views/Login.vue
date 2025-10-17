<template>
  <section class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center mb-6">Admin Login</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-gray-700 font-medium mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            required
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label for="password" class="block text-gray-700 font-medium mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            required
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>

        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
          :disabled="loading"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <p class="text-center mt-4 text-sm text-gray-500">
        Forgot your password? 
        <router-link to="/forgot-password" class="text-blue-500 hover:underline">Reset here</router-link>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../service/api' // make sure api.js has your baseURL

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
const res = await api.post('/auth/login', {
  email: email.value,
  password: password.value
});
    // Save token in localStorage
    localStorage.setItem('token', res.data.token)
    // Redirect to dashboard
    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
