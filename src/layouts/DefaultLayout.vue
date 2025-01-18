<template>
  <div class="w-full min-h-screen bg-gray-50/30 flex flex-col">
    <div class="flex flex-1">
      <!-- Overlay for mobile -->
      <div
        v-if="isMobile && !isSidebarCollapsed"
        class="fixed inset-0 bg-black bg-opacity-50 z-20"
        @click="toggleSidebar"
      ></div>

      <SideBar
        :is-collapsed="isSidebarCollapsed"
        :is-mobile="isMobile"
        class="z-30"
      />
      <div class="flex-1 flex flex-col">
        <header class="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
          <div class="flex justify-between items-center max-w-7xl mx-auto">
            <div class="flex items-center gap-4">
              <button
                @click="toggleSidebar"
                class="p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Toggle sidebar"
              >
                <svg
                  v-if="isSidebarCollapsed"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <!-- <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1> -->
              <p class="text-gray-500 hidden sm:block">Welcome, Interviewer!</p>
            </div>
            <div class="flex items-center gap-4">
              <a
                href="https://okeibunoremma.netlify.app"
                target="_blank"
                class="p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a1 1 0 1 0-2 0v5H5V5h5a1 1 0 1 0 0-2zm10.707 1.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414zM14 3a1 1 0 1 0 0 2h3.586l-7.293 7.293a1 1 0 0 0 1.414 1.414L19 6.414V10a1 1 0 1 0 2 0V5a2 2 0 0 0-2-2h-5z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </header>

        <main class="flex-grow p-6">
          <div class="max-w-7xl mx-auto">
            <transition name="fade" mode="out-in">
              <slot />
            </transition>
          </div>
        </main>
      </div>
    </div>
    <footer class="bg-white shadow-sm px-6 py-4 border-t border-gray-100">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <p class="text-sm text-gray-600">© 2024 Sycamore Interview.</p>
        <div class="flex items-center gap-4">
          <p class="text-gray-600 text-sm">Inpiration: Render Dashboard</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SideBar from '@/components/SideBar.vue'

const isSidebarCollapsed = ref(false)
const isMobile = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
  if (isMobile.value) {
    isSidebarCollapsed.value = true
  }
}

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
