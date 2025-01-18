<template>
  <div>
    <!-- Modal Backdrop -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
      @click="closeModal"
    ></div>

    <!-- Modal Content -->
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-end justify-center sm:p-6 h-screen sm:h-[80vh] overflow-y-auto">
      <div class="w-full lg:max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl shadow-xl overflow-y-auto max-h-[80vh]" @click.stop>
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white">
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
                  v-model="formData.first_name"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"> Last Name </label>
                <input
                  v-model="formData.last_name"
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
                  v-model="formData.phone_number"
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
                    <input v-model="formData.status" type="checkbox" class="sr-only" />
                    <div
                      :class="[
                        'w-10 h-6 rounded-full transition-colors',
                        formData.status ? 'bg-black' : 'bg-gray-200',
                      ]"
                    >
                      <div
                        :class="[
                          'w-4 h-4 rounded-full bg-white transform transition-transform',
                          formData.status ? 'translate-x-5' : 'translate-x-1',
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
                <QuillEditor theme="snow" content-type="html" v-model:content="formData.details" />
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
            :disabled="isLoading"
            class="px-4 py-2 bg-black text-white rounded-lg hover:bg-black/90 transition-colors flex items-center justify-center"
          >
            <span
              v-if="isLoading"
              class="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-t-transparent border-white mr-2"
            ></span>
            Add Customer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useCustomerStore } from '@/stores/customer'

const customerService = useCustomerStore()
const isOpen = ref(false)
const isLoading = ref(false)
const formData = reactive({
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  state: '',
  status: true,
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

const handleSubmit = async () => {
  isLoading.value = true
  try {
    await customerService.createCustomer(formData)
    Object.keys(formData).forEach((key) => {
      formData[key] = key === 'status' ? true : ''
    })
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
    closeModal()
  }
}

// Expose necessary methods
defineExpose({
  openModal,
  closeModal,
})
</script>
