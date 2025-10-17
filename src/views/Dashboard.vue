<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- ✅ Dashboard Header -->
    <header class="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-700">Admin Dashboard</h1>
      <button
        @click="logout"
        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </header>

    <!-- 📦 Main Content -->
    <main class="flex-1 p-6">
      <!-- Tabs -->
      <div class="flex space-x-4 mb-6 border-b border-gray-200">
        <button
          @click="activeTab = 'projects'"
          :class="activeTab === 'projects' ? activeTabClass : inactiveTabClass"
        >
          Projects
        </button>
        <button
          @click="activeTab = 'categories'"
          :class="activeTab === 'categories' ? activeTabClass : inactiveTabClass"
        >
          Categories
        </button>
      </div>

      <!-- 🧱 PROJECTS TAB -->
      <section v-if="activeTab === 'projects'">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Manage Projects</h2>
          <button
            @click="showProjectForm = true"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Project
          </button>
        </div>

        <!-- Project List -->
        <div v-if="loading" class="text-gray-500">Loading...</div>
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="project in projects"
            :key="project._id"
            class="border rounded p-4 bg-white shadow-sm"
          >
            <img
              v-if="project.image"
              :src="project.image"
              alt="project image"
              class="w-full h-48 object-cover mb-2 rounded"
            />
            <h3 class="font-bold text-lg">{{ project.title }}</h3>
            <p class="text-gray-600 text-sm mb-2">{{ project.description }}</p>
            <p class="text-sm text-blue-500 mb-4">Category: {{ project.category?.name }}</p>
            <p class="text-sm text-blue-500 mb-2" v-if="project.link">
              <a :href="project.link" target="_blank" class="underline">View Live</a>
            </p>
            <p class="text-xs text-gray-400">
              Created: {{ new Date(project.createdAt).toLocaleString() }}
            </p>
            <div class="flex justify-end space-x-2 mt-3">
              <button @click="editProject(project)" class="text-yellow-600 hover:underline">
                Edit
              </button>
              <button @click="deleteProject(project._id)" class="text-red-600 hover:underline">
                Delete
              </button>
            </div>
          </div>
        </div>

        <!-- Add/Edit Project Modal -->
        <div
          v-if="showProjectForm"
          class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
        >
          <div class="bg-white rounded-lg shadow-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
            <h3 class="text-lg font-semibold mb-4">
              {{ editingProject ? 'Edit Project' : 'Add Project' }}
            </h3>

            <form @submit.prevent="saveProject" class="space-y-3">
              <input
                v-model="form.title"
                type="text"
                placeholder="Title"
                class="w-full border px-3 py-2 rounded"
                required
              />

              <textarea
                v-model="form.description"
                placeholder="Description"
                class="w-full border px-3 py-2 rounded"
                required
              ></textarea>

              <input
                v-model="form.link"
                type="text"
                placeholder="Project Link (optional)"
                class="w-full border px-3 py-2 rounded"
              />

              <!-- ✅ File upload -->
              <input
                type="file"
                @change="handleFileUpload"
                accept="image/*"
                class="w-full border px-3 py-2 rounded"
              />

              <select
                v-model="form.category"
                class="w-full border px-3 py-2 rounded"
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

              <div class="flex justify-end space-x-2 mt-3">
                <button
                  type="button"
                  @click="cancelProject"
                  class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Manage Categories</h2>
          <div>
            <input
              v-model="newCategory"
              placeholder="New Category"
              class="border px-3 py-2 rounded mr-2"
            />
            <button
              @click="addCategory"
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>

        <ul class="space-y-2">
          <li
            v-for="cat in categories"
            :key="cat._id"
            class="flex justify-between items-center border-b pb-2"
          >
            <span>{{ cat.name }}</span>
            <button
              @click="deleteCategory(cat._id)"
              class="text-red-600 hover:underline"
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

onMounted(() => {
  fetchProjects()
  fetchCategories()
})
</script>
