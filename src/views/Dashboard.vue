<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-white flex flex-col transition-all duration-500">
    <!-- ✅ Dashboard Header -->
    <header class="bg-white/95 backdrop-blur-md shadow-lg py-4 px-6 flex justify-between items-center border-b-2 border-amber-400 transition-all duration-500">
      <h1 class="text-2xl font-bold text-gray-800 transition-all duration-500">Admin Dashboard</h1>
      <button
        @click="logout"
        class="bg-gradient-to-r from-red-800 to-amber-600 hover:from-red-900 hover:to-amber-700 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        Logout
      </button>
    </header>

    <!-- 📦 Main Content -->
    <main class="flex-1 p-6 transition-all duration-500">
      <!-- Tabs -->
      <div class="flex space-x-4 mb-6 border-b-2 border-amber-300 transition-all duration-500">
        <button
          @click="activeTab = 'projects'"
          :class="activeTab === 'projects' ? 'border-b-2 border-amber-600 text-amber-700 font-semibold py-2 px-4 transition-all duration-300' : 'text-gray-600 hover:text-amber-600 py-2 px-4 transition-all duration-300'"
        >
          Projects
        </button>
        <button
          @click="activeTab = 'categories'"
          :class="activeTab === 'categories' ? 'border-b-2 border-amber-600 text-amber-700 font-semibold py-2 px-4 transition-all duration-300' : 'text-gray-600 hover:text-amber-600 py-2 px-4 transition-all duration-300'"
        >
          Categories
        </button>
        <button
          @click="activeTab = 'messages'"
          :class="activeTab === 'messages' ? 'border-b-2 border-amber-600 text-amber-700 font-semibold py-2 px-4 transition-all duration-300' : 'text-gray-600 hover:text-amber-600 py-2 px-4 transition-all duration-300'"
        >
          Messages
        </button>
      </div>

      <!-- 🧱 PROJECTS TAB -->
      <section v-if="activeTab === 'projects'">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-800 transition-all duration-500">Manage Projects</h2>
          <button
            @click="showProjectForm = true"
            class="bg-gradient-to-r from-red-800 to-amber-600 hover:from-red-900 hover:to-amber-700 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            + Add Project
          </button>
        </div>
        

        <!-- Project List -->
        <div v-if="loading" class="text-gray-500 transition-all duration-500">Loading...</div>
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
          <div
            v-for="project in projects"
            :key="project._id"
            class="border-2 border-amber-300 rounded-2xl p-4 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            <img
              v-if="project.image"
              :src="project.image"
              alt="project image"
              class="w-full h-48 object-cover mb-3 rounded-xl"
            />
            <h3 class="font-bold text-lg text-gray-800 transition-all duration-300">{{ project.title }}</h3>
            <p class="text-gray-600 text-sm mb-2 transition-all duration-300">{{ project.description }}</p>
            <p class="text-sm text-red-800 font-medium mb-4 transition-all duration-300">Category: {{ project.category?.name }}</p>
            <p class="text-sm text-amber-600 font-medium mb-2 transition-all duration-300" v-if="project.link">
              <a :href="project.link" target="_blank" class="underline hover:text-red-800 transition-all duration-300">View Live</a>
            </p>
            <p class="text-xs text-gray-400 transition-all duration-300">
              Created: {{ new Date(project.createdAt).toLocaleString() }}
            </p>
            <div class="flex justify-end space-x-3 mt-4">
              <button @click="editProject(project)" class="text-amber-600 hover:text-amber-800 font-medium transition-all duration-300">
                Edit
              </button>
              <button @click="deleteProject(project._id)" class="text-red-600 hover:text-red-800 font-medium transition-all duration-300">
                Delete
              </button>
            </div>
          </div>
        </div>

        <!-- Add/Edit Project Modal -->
        <div
          v-if="showProjectForm"
          class="fixed inset-0 bg-opacity-45 flex justify-center items-center backdrop-blur-sm transition-all duration-500"
        >
          <div class="bg-white rounded-2xl shadow-2xl p-6 w-96 max-h-[90vh] overflow-y-auto border-2 border-amber-400 transition-all duration-500">
            <h3 class="text-lg font-bold text-gray-800 mb-4 transition-all duration-500">
              {{ editingProject ? 'Edit Project' : 'Add Project' }}
            </h3>

            <form @submit.prevent="saveProject" class="space-y-4">
              <input
                v-model="form.title"
                type="text"
                placeholder="Title"
                class="w-full border-2 border-amber-300 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-amber-50/50 transition-all duration-300"
                required
              />

              <textarea
                v-model="form.description"
                placeholder="Description"
                class="w-full border-2 border-amber-300 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-amber-50/50 transition-all duration-300"
                required
              ></textarea>

              <input
                v-model="form.link"
                type="text"
                placeholder="Project Link (optional)"
                class="w-full border-2 border-amber-300 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-amber-50/50 transition-all duration-300"
              />

              <!-- ✅ File upload -->
              <input
                type="file"
                @change="handleFileUpload"
                accept="image/*"
                class="w-full border-2 border-amber-300 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-amber-50/50 transition-all duration-300"
              />
              <select
                v-model="form.category"
                class="w-full border-2 border-amber-300 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-amber-50/50 transition-all duration-300"
                required
              >
                <option value="">Select Category</option>
                <option
                  v-for="cat in categories"
                  :key="cat._id"
                  :value="cat._id"
                >
                  {{ cat.name }}
                </option>
              </select>

              <div class="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  @click="cancelProject"
                  class="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400 font-medium transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 bg-gradient-to-r from-red-800 to-amber-600 hover:from-red-900 hover:to-amber-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <!-- 🗂️ CATEGORIES TAB -->
      <section v-if="activeTab === 'categories'">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-800 transition-all duration-500">Manage Categories</h2>
          <div class="flex space-x-3">
            <input
              v-model="newCategory"
              placeholder="New Category"
              class="border-2 border-amber-300 rounded-xl px-4 py-2 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-amber-50/50 transition-all duration-300"
            />
            <button
              @click="addCategory"
              class="bg-gradient-to-r from-red-800 to-amber-600 hover:from-red-900 hover:to-amber-700 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Add
            </button>
          </div>
        </div>

        <ul class="space-y-3 transition-all duration-500">
          <li
            v-for="cat in categories"
            :key="cat._id"
            class="flex justify-between items-center border-b-2 border-amber-200 pb-3 transition-all duration-300"
          >
            <span class="text-gray-700 font-medium transition-all duration-300">{{ cat.name }}</span>
            <button
              @click="deleteCategory(cat._id)"
              class="text-red-600 hover:text-red-800 font-medium transition-all duration-300"
            >
              Delete
            </button>
          </li>
        </ul>
      </section>
     
     <!-- 💬 MESSAGES TAB -->
      <section v-if="activeTab === 'messages'">
        <h2 class="text-xl font-bold text-gray-800 mb-6 transition-all duration-500">Messages</h2>

        <div v-if="loading" class="text-gray-500 transition-all duration-500">Loading...</div>
        <ul v-else class="space-y-4 transition-all duration-500">
          <li
            v-for="msg in messages"
            :key="msg._id"
            class="border-2 border-amber-300 rounded-2xl p-4 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex justify-between items-start"
          >
            <div>
              <p class="font-semibold text-gray-800 transition-all duration-300">{{ msg.name }} ({{ msg.email }})</p>
              <p class="text-sm text-amber-600 font-medium transition-all duration-300">Subject: {{ msg.subject }}</p>
              <p class="text-gray-700 mt-2 transition-all duration-300">{{ msg.message }}</p>
              <p class="text-xs text-gray-400 mt-2 transition-all duration-300">
                Sent: {{ new Date(msg.createdAt).toLocaleString() }}
              </p>
            </div>
            <button
              @click="deleteMessage(msg._id)"
              class="text-red-600 hover:text-red-800 font-medium transition-all duration-300 ml-4"
            >
              Delete
            </button>
          </li>
        </ul>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../service/api'
import router from '../router'
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const toast = useToast();

const activeTab = ref('projects')
const projects = ref([])
const categories = ref([])
const loading = ref(false)

const showProjectForm = ref(false)
const editingProject = ref(false)
const selectedFile = ref(null)
const form = ref({ title: '', description: '', link: '', category: '' })
const newCategory = ref('')

const activeTabClass = 'border-b-2 border-blue-600 pb-2 font-semibold'
const inactiveTabClass = 'text-gray-500 pb-2'

// ✅ Handle file upload
const handleFileUpload = (e) => {
  selectedFile.value = e.target.files[0]
}

// ✅ Fetch projects and categories
const fetchProjects = async () => {
  try {
    loading.value = true
    const { data } = await api.get('/projects')
    projects.value = data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  try {
    const { data } = await api.get('/categories')
    categories.value = data
  } catch (err) {
    console.error(err)
  }
}

// ✅ Save or update project
const saveProject = async () => {
  try {
    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('description', form.value.description)
    formData.append('link', form.value.link)
    formData.append('category', form.value.category)
    if (selectedFile.value) {
      formData.append('image', selectedFile.value)
    }

    if (editingProject.value) {
      await api.put(`/projects/${form.value._id}`, formData)
    } else {
      await api.post('/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    }

    await fetchProjects()
    cancelProject()
  } catch (err) {
    console.error('Error saving project:', err)
  }
}

const editProject = (project) => {
  form.value = { ...project, category: project.category?._id }
  editingProject.value = true
  showProjectForm.value = true
}

const deleteProject = async (id) => {
  if (confirm('Delete this project?')) {
    await api.delete(`/projects/${id}`)
    await fetchProjects()
  }
}

const cancelProject = () => {
  showProjectForm.value = false
  editingProject.value = false
  form.value = { title: '', description: '', link: '', category: '' }
  selectedFile.value = null
}

// ✅ Category CRUD
const addCategory = async () => {
  if (!newCategory.value.trim()) return
  await api.post('/categories', { name: newCategory.value })
  newCategory.value = ''
  await fetchCategories()
}

const deleteCategory = async (id) => {
  if (confirm('Delete this category?')) {
    await api.delete(`/categories/${id}`)
    await fetchCategories()
  }
}

// ✅ Logout
const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
const messages = ref([])

const fetchMessages = async () => {
  try {
    const { data } = await api.get("/messages")
    messages.value = data
  } catch (err) {
    console.error(err)
  }
}

const deleteMessage = async (id) => {
  if (confirm("Are you sure you want to delete this message?")) {
    try {
      await api.delete(`/messages/${id}`)
      await fetchMessages()
      toast.success('Message deleted successfully!')
    } catch (err) {
      console.error(err)
    }
  }
}

onMounted(() => {
  fetchProjects()
  fetchCategories()
  fetchMessages()
})
</script>
