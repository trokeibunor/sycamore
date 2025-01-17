<template>
  <div class="p-6">
    <div class="w-full flex flex-col gap-8">
      <!-- Header Section -->
      <div class="flex flex-col gap-2">
        <h3 class="text-2xl font-semibold text-gray-900">Customer's Table</h3>
        <p class="text-gray-500">You can view your customer's data here and make nice changes</p>
      </div>

      <!-- Controls Section -->
      <div class="w-full flex flex-wrap gap-4 justify-between">
        <div class="flex flex-wrap gap-4 items-center">
          <div class="relative">
            <svg
              class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="{2}"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search customers..."
              class="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
            />
          </div>

        </div>
        <button
          class="bg-black hover:bg-black/90 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          @click="openCustomerModal"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Customer
        </button>
      </div>

      <!-- Table Section -->
      <div class="w-full overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50/50">
              <tr>
                <th
                  v-for="header in tableHeaders"
                  :key="header.key"
                  class="px-6 py-4 text-left text-sm font-medium text-gray-500"
                >
                  <div class="flex items-center gap-2">
                    {{ header.label }}
                    <svg
                      v-if="header.sortable"
                      class="w-4 h-4 text-gray-400 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="{2}"
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      />
                    </svg>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="customer in customers"
                :key="customer.id"
                class="hover:bg-gray-50/50 transition-colors"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500"
                    >
                      {{ customer.firstName.charAt(0) }}
                    </div>
                    <div class="font-medium text-gray-900">{{ customer.firstName }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 text-gray-900">{{ customer.lastName }}</td>
                <td class="px-6 py-4 text-gray-500">{{ customer.email }}</td>
                <td class="px-6 py-4 text-gray-500">{{ customer.phone }}</td>
                <td class="px-6 py-4">
                  <span class="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                    {{ customer.state }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <button class="p-1 hover:bg-gray-100 rounded" title="View">
                      <svg
                        class="w-4 h-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="{2}"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="{2}"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                    <button class="p-1 hover:bg-gray-100 rounded" title="Edit">
                      <svg
                        class="w-4 h-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="{2}"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                    <button class="p-1 hover:bg-gray-100 rounded" title="Delete">
                      <svg
                        class="w-4 h-4 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="{2}"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p class="text-sm text-gray-500">Showing 1 to 10 of 50 results</p>
          <div class="flex gap-2">
            <button class="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">
              Previous
            </button>
            <button class="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
      <CustomerModal ref="customerModal" />
    </div>
  </div>
</template>

<script setup>
import CustomerModal from '@/components/CustomerModal.vue';
import { ref } from 'vue'
const customerModal = ref(null)

const searchQuery = ref('')

const tableHeaders = [
  { key: 'firstName', label: 'First Name', sortable: true },
  { key: 'lastName', label: 'Last Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'phone', label: 'Phone Number', sortable: true },
  { key: 'state', label: 'State', sortable: true },
  { key: 'actions', label: 'Actions', sortable: false },
]

const customers = ref([
  {
    id: 1,
    firstName: 'Oluwaseun',
    lastName: 'Adebayo',
    email: 'seun.adebayo@example.com',
    phone: '+234 801 234 5678',
    state: 'Lagos',
  },
  {
    id: 2,
    firstName: 'Chioma',
    lastName: 'Okonkwo',
    email: 'chioma.o@example.com',
    phone: '+234 802 345 6789',
    state: 'Abuja',
  },
  {
    id: 3,
    firstName: 'Ibrahim',
    lastName: 'Musa',
    email: 'ibrahim.m@example.com',
    phone: '+234 803 456 7890',
    state: 'Kano',
  },
  // Add more customers as needed
])

const openCustomerModal = () => {
  if (customerModal.value) {
    customerModal.value.openModal();
  }
};
</script>
