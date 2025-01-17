<template>
  <div>
    <!-- Modal Backdrop -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
      @click="closeModal"
    ></div>

    <!-- Modal Content -->
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div class="w-full max-w-2xl bg-white rounded-2xl shadow-xl" @click.stop>
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 class="text-lg font-semibold text-gray-900">Add New Customer</h3>
          <button @click="closeModal" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <svg
              class="w-5 h-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="{2}"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Name Fields -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"> First Name </label>
                <input
                  v-model="formData.firstName"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"> Last Name </label>
                <input
                  v-model="formData.lastName"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <!-- Contact Fields -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"> Email </label>
                <input
                  v-model="formData.email"
                  type="email"
                  required
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"> Phone Number </label>
                <input
                  v-model="formData.phone"
                  type="tel"
                  required
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  placeholder="+234"
                />
              </div>
            </div>

            <!-- State and Status -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"> State </label>
                <select
                  v-model="formData.state"
                  required
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                >
                  <option value="">Select a state</option>
                  <option v-for="state in nigerianStates" :key="state" :value="state">
                    {{ state }}
                  </option>
                </select>
              </div>
              <div class="flex items-center space-x-3">
                <label class="flex items-center space-x-3 cursor-pointer">
                  <div class="relative inline-flex items-center">
                    <input v-model="formData.isActive" type="checkbox" class="sr-only" />
                    <div
                      :class="[
                        'w-10 h-6 rounded-full transition-colors',
                        formData.isActive ? 'bg-black' : 'bg-gray-200',
                      ]"
                    >
                      <div
                        :class="[
                          'w-4 h-4 rounded-full bg-white transform transition-transform',
                          formData.isActive ? 'translate-x-5' : 'translate-x-1',
                        ]"
                        class="mt-1"
                      ></div>
                    </div>
                    <span class="ml-2 text-sm font-medium text-gray-700">Set to active</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Rich Text Editor -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"> Customer Details </label>
              <div class="border border-gray-200 rounded-lg">
                <div class="border-b border-gray-200 p-2 bg-gray-50 flex gap-2">
                  <button
                    v-for="format in ['bold', 'italic', 'underline']"
                    :key="format"
                    type="button"
                    class="p-1 hover:bg-gray-100 rounded"
                  >
                    <svg
                      class="w-4 h-4 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="{2}"
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                  </button>
                </div>
                <textarea
                  v-model="formData.details"
                  rows="4"
                  class="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  placeholder="Enter customer details..."
                ></textarea>
              </div>
            </div>
          </form>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-4 p-6 border-t border-gray-100">
          <button
            @click="closeModal"
            class="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="handleSubmit"
            class="px-4 py-2 bg-black text-white rounded-lg hover:bg-black/90 transition-colors"
          >
            Add Customer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const isOpen = ref(false)
const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  state: '',
  isActive: false,
  details: '',
})

const nigerianStates = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
]

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}

const handleSubmit = () => {
  // Handle form submission
  console.log('Form submitted:', formData)
  closeModal()
}

// Expose necessary methods
defineExpose({
  openModal,
  closeModal,
})
</script>
