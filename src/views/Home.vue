
<template>
  <div class="min-h-screen flex flex-col bg-gray-300 text-gray-800">

    <!-- 🌐 Navbar -->
    <nav class="flex justify-between items-center px-6 py-4 shadow-sm backdrop-blur-md bg-white/95 sticky top-0 z-50 border-b border-amber-500">
      <h1 class="text-2xl font-bold tracking-tight">Nafii Portfolio</h1>
      <ul class="hidden md:flex space-x-6">
        <li><a href="#home" class="nav-link bg-red-50 text-red-600 font-medium px-4 py-2 rounded-lg hover:bg-red-200 transition">Home</a></li>
        <li><a href="#about" class="nav-link bg-red-50 text-red-600 font-medium px-4 py-2 rounded-lg hover:bg-red-200 transition">About</a></li>
        <li><a href="#projects" class="nav-link bg-red-50 text-red-600 font-medium px-4 py-2 rounded-lg hover:bg-red-200 transition">Projects</a></li>
        <li><a href="#contact" class="nav-link bg-red-50 text-red-600 font-medium px-4 py-2 rounded-lg hover:bg-red-200 transition">Contact</a></li>
      </ul>

      <!-- Mobile Menu -->
      <button @click.stop="toggleMenu" class="md:hidden text-amber-600 focus:outline-none">
  <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
    viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M4 6h16M4 12h16M4 18h16" />
  </svg>
  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
    viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>

    </nav>

    <!-- Mobile Dropdown Menu -->
    <!-- 📱 Right-side Mobile Menu -->
<transition name="slide-right">
  <div
    v-if="menuOpen"
    class="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 flex flex-col items-start p-6 space-y-4 border-l border-amber-500 md:hidden"
  >
    <button
      @click="closeMenu"
      class="self-end mb-4 text-amber-600 focus:outline-none"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <a href="#home" @click="handleNavClick" class="nav-link-mobile hover:text-amber-600">🏠 Home</a>
    <a href="#about" @click="handleNavClick" class="nav-link-mobile hover:text-amber-600">👩‍💻 About</a>
    <a href="#projects" @click="handleNavClick" class="nav-link-mobile hover:text-amber-600">🧩 Projects</a>
    <a href="#contact" @click="handleNavClick" class="nav-link-mobile hover:text-amber-600">📩 Contact</a>
  </div>
</transition>

      <!-- 🏠 Home Section -->
<section
  id="home"
  class="min-h-screen flex flex-col justify-center items-start px-8 md:px-16 bg-gradient-to-br from-white to-amber-800 overflow-hidden"
>
  <div class="max-w-3xl space-y-4">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
      <!-- Line 1 -->
      <span
        class="block opacity-0 -translate-x-10 transition-all duration-700"
        :class="{ 'opacity-100 translate-x-0': showLine1 }"
      >
        Hi, I'm
      </span>

      <!-- Line 2 (animated gradient name) -->
      <span
        class="block bg-gradient-to-r from-red-800 via-amber-600 to-red-800 bg-[length:200%_200%] animate-gradient bg-clip-text text-transparent opacity-0 -translate-x-10 transition-all duration-700 delay-200"
        :class="{ 'opacity-100 translate-x-0': showLine2 }"
      >
        Nafii
      </span>

      <!-- Line 3 -->
      <span
        class="block opacity-0 -translate-x-10 transition-all duration-700 delay-300"
        :class="{ 'opacity-100 translate-x-0': showLine3 }"
      >
        Crafting modern web applications & digital experiences
      </span>
    </h1>

    <!-- Paragraph -->
    <p
      class="text-lg md:text-xl text-gray-800 leading-relaxed opacity-0 translate-y-4 transition-all duration-700 delay-500"
      :class="{ 'opacity-100 translate-y-0': showParagraph }"
    >
      I design and develop responsive, user-friendly web solutions that help ideas come to life.
      Explore my projects, learn about my expertise, and let's create something impactful together.
    </p>
  </div>
</section>

      <!-- 👩‍💻 About Section -->
      <section id="about" class="py-20 px-8 md:px-16 bg-white border-l-4 border-amber-500 pl-8 transition-all duration-500">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-8xl font-bold md:text-4xl font-extrabold text-gray-800 mb-6 transition-all duration-500">
            About Me
          </h2>
          <p class="text-gray-700 text-2xl md:text-xl mb-6 leading-relaxed italic transition-all duration-500">
            I'm <strong class="text-red-800 font-bold not-italic">Nafii</strong>, a full-stack developer specializing in building 
            clean, efficient, and scalable web applications. With expertise in 
            <strong class="text-red-800 font-bold not-italic">Vue.js, Tailwind CSS</strong> for front-end development and 
            <strong class="text-red-800 font-bold not-italic">Node.js, Express, MongoDB</strong> for back-end, I create digital solutions 
            that solve real-world problems.
          </p>
          <p class="text-gray-700 text-2xl md:text-xl mb-6 leading-relaxed italic transition-all duration-500">
            My approach focuses on responsive design, seamless user experience, and modern best practices. 
            I enjoy turning complex challenges into intuitive digital experiences and helping businesses
            and individuals establish a strong online presence.
          </p>
          <p class="text-gray-700 text-2xl md:text-xl leading-relaxed italic transition-all duration-500">
            When I'm not coding, I explore new technologies, contribute to open-source projects, 
            and share insights about software development and design through my portfolio.
          </p>
        </div>
      </section>


      <!-- 🧱 Projects Section -->
      <section id="projects" class="py-20 px-6 bg-gradient-to-br from-white to-amber-800">
        <div class="max-w-6xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-10">My Projects</h2>

          <!-- Loading screener -->
          <div v-if="loadingProjects" class="flex justify-center items-center">
            <svg class="animate-spin h-10 w-10 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          </div>

          <!-- Error message -->
          <div v-else-if="projectsError" class="text-red-500">{{ projectsError }}</div>

          <!-- Projects grid -->
          <div v-else class="grid md:grid-cols-3 gap-6">          
              <div v-for="project in projects" :key="project._id"
                class="border-2 border-amber-400 rounded-lg p-5 shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
                <a :href="project.link" target="_blank" rel="noopener">
                    <img :src="project.image" alt="">
                    <h3 class="text-xl font-semibold mb-2 text-gray-800">{{ project.title }}</h3>
                    <p class="text-gray-600 mb-3">{{ project.description }}</p>
                    <p class="text-sm text-red-800 font-medium">
                      Category: {{ project.category?.name || 'Uncategorized' }}
                    </p>
                </a>
              </div>
          </div>
        </div>
      </section>

      <!-- ✉️ Contact Section -->
       <section id="contact" class="py-16 bg-gradient-to-t from-amber-50 to-white">
      <div class="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl border-2 border-amber-400 transition-all duration-500 hover:shadow-2xl">
        <h2 class="text-3xl font-bold mb-6 text-center text-gray-800 transition-all duration-500">Contact Me</h2>

        <form @submit.prevent="sendMessage">
          <input
            v-model="form.name"
            type="text"
            placeholder="Your Name"
            class="w-full border-2 border-amber-300 p-4 mb-4 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300 bg-amber-50/50"
            required
          />
          <input
            v-model="form.email"
            type="email"
            placeholder="Your Email"
            class="w-full border-2 border-amber-300 p-4 mb-4 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300 bg-amber-50/50"
            required
          />
          <input
            v-model="form.subject"
            type="text"
            placeholder="Subject"
            class="w-full border-2 border-amber-300 p-4 mb-4 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300 bg-amber-50/50"
            required
          />
          <textarea
            v-model="form.message"
            placeholder="Your Message"
            class="w-full border-2 border-amber-300 p-4 mb-6 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300 bg-amber-50/50"
            rows="5"
            required
          ></textarea>

        <button
    type="submit"
    :disabled="loading"
    class="flex justify-center items-center bg-gradient-to-r from-red-800 to-amber-600 text-white px-6 py-4 rounded-xl font-semibold w-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
  >
    <svg
      v-if="loading"
      class="animate-spin h-5 w-5 text-white mr-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>

    <span>{{ loading ? '.Sending..' : 'Send Message' }}</span>
  </button>

        </form>
      </div>
    </section>

      
      <!-- 🔻 Footer -->
      <footer class="bg-gradient-to-r from-amber-50 to-red-50 py-4 px-6 flex justify-between items-center text-gray-600 text-sm border-t border-amber-400">
        <div>
          &copy; 2025 Nafii. All rights reserved.
        </div>
        <div class="flex justify-center space-x-6 text-2xl">
          <!-- GitHub -->
          <a href="https://github.com/nafiie" target="_blank" rel="noopener" class="hover:text-amber-600 transition-colors">
            <svg class="w-7 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.29 3.438 9.77 8.205 11.345.6.113.82-.26.82-.577 0-.285-.01-1.04-.016-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.746.083-.73.083-.73 1.205.084 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.762-1.605-2.665-.3-5.467-1.333-5.467-5.932 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.44 11.44 0 013.003-.404c1.02.004 2.045.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.653.242 2.873.12 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.628-5.48 5.922.43.37.813 1.102.813 2.222 0 1.604-.015 2.896-.015 3.29 0 .32.216.694.825.576C20.565 22.27 24 17.79 24 12.5 24 5.87 18.627.5 12 .5z"/>
            </svg>
          </a>

          <!-- LinkedIn -->
          <a href="https://www.linkedin.com/in/gift-nafisat-amusat-239005339" target="_blank" rel="noopener" class="hover:text-amber-600 transition-colors">
            <svg class="w-7 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.762 0 5-2.24 5-5v-14c0-2.76-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764 0-.973.784-1.764 1.75-1.764s1.75.791 1.75 1.764c0 .974-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.026-3.064-1.867-3.064-1.868 0-2.155 1.459-2.155 2.967v5.701h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.562 2.837-1.562 3.033 0 3.595 1.997 3.595 4.59v5.605z"/>
            </svg>
          </a>

          <!-- Twitter -->
          <a href="https://x.com/GiftNafisat" target="_blank" rel="noopener" class="hover:text-amber-600 transition-colors">
            <svg class="w-7 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.38 4.482c-4.083-.204-7.702-2.158-10.126-5.134a4.822 4.822 0 00-.666 2.475 4.917 4.917 0 002.188 4.096 4.903 4.903 0 01-2.224-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.085 4.923 4.923 0 004.6 3.417 9.867 9.867 0 01-6.102 2.105c-.396 0-.787-.023-1.175-.068a13.933 13.933 0 007.557 2.212c9.054 0 14.002-7.496 14.002-13.986 0-.213-.005-.425-.014-.637a10.012 10.012 0 002.46-2.548l-.047-.020z"/>
            </svg>
          </a>
        </div>
        <div class="text-amber-600 italic font-medium">
          Designed with ❤️ by Nafii
        </div>
      </footer>

    </div>
  </template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Github, Linkedin } from 'lucide-vue-next'
import api from '../service/api'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const $toast = useToast()

// 🧭 Navbar & menu
const menuOpen = ref(false)
const toggleMenu = () => (menuOpen.value = !menuOpen.value)
const handleNavClick = (event) => {
  const target = event.target.getAttribute('href')?.substring(1)
  if (target) {
    const section = document.getElementById(target)
    if (section) section.scrollIntoView({ behavior: 'smooth' })
  }
  menuOpen.value = false
}
const handleOutsideClick = (e) => {
  const nav = document.querySelector('nav')
  const dropdown = document.querySelector('.mobile-dropdown')
  if (menuOpen.value && !nav.contains(e.target) && !dropdown?.contains(e.target)) {
    menuOpen.value = false
  }
}
onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
  document.documentElement.style.scrollBehavior = 'smooth'
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick)
})

// 🗂️ Projects
const projects = ref([])
const loadingProjects = ref(true)
const projectsError = ref('')
const fetchProjects = async () => {
  loadingProjects.value = true
  projectsError.value = ''
  try {
    const res = await api.get('/projects')
    projects.value = res.data
  } catch (err) {
    projectsError.value = err.response?.data?.message || 'Failed to fetch projects'
  } finally {
    loadingProjects.value = false
  }
}

// ✉️ Contact form
const form = ref({ name: '', email: '', subject: '', message: '' })
const loading = ref(false)
const sendMessage = async () => {
  if (loading.value) return
  loading.value = true
  try {
    await api.post('/messages', form.value)
    await new Promise(resolve => setTimeout(resolve, 3500))
    $toast.success("Message sent successfully! I'll get back to you soon.", { duration: 3000 })
    form.value = { name: '', email: '', subject: '', message: '' }
  } catch (err) {
    await new Promise(resolve => setTimeout(resolve, 3000))
    $toast.error('Failed to send message. Please try again.')
    console.error(err)
  } finally {
    loading.value = false
  }
}

// 🪄 Animated intro text
const showLine1 = ref(false)
const showLine2 = ref(false)
const showLine3 = ref(false)
const showParagraph = ref(false)

onMounted(() => {
  fetchProjects()

  // Sequential animation for hero section
  setTimeout(() => (showLine1.value = true), 300)
  setTimeout(() => (showLine2.value = true), 900)
  setTimeout(() => (showLine3.value = true), 1500)
  setTimeout(() => (showParagraph.value = true), 2200)
})
</script>
