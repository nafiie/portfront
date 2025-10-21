<template>
  <section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-white px-4 transition-all duration-500">
    <div class="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border-2 border-amber-400 transition-all duration-500 hover:shadow-2xl">
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-800 transition-all duration-500">Admin Login</h2>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-gray-700 font-medium mb-2 transition-all duration-300">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            required
            class="w-full border-2 border-amber-300 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-amber-50/50 transition-all duration-300"
          />
        </div>

        <div>
          <label for="password" class="block text-gray-700 font-medium mb-2 transition-all duration-300">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            required
            class="w-full border-2 border-amber-300 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-amber-50/50 transition-all duration-300"
          />
        </div>

        <div v-if="error" class="text-red-800 text-sm font-medium transition-all duration-300">{{ error }}</div>

        <button
          type="submit"
          class="w-full bg-gradient-to-r from-red-800 to-amber-600 hover:from-red-900 hover:to-amber-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          :disabled="loading"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <p class="text-center mt-6 text-sm text-gray-600 transition-all duration-300">
        Forgot your password? 
        <router-link to="/forgot-password" class="text-amber-600 hover:text-red-800 font-medium hover:underline transition-all duration-300">Reset here</router-link>
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
