<template>
  <div
    :class="[
      'sidebar',
      {
        collapsed: isCollapsed,
        mobile: isMobile,
        hidden: isMobile && isCollapsed,
      },
    ]"
    class="bg-white shadow-lg border-r border-gray-100 h-full min-h-screen transition-all duration-300"
  >
    <div class="p-4 border-b border-gray-100">
      <div class="flex items-center gap-3">
        <img
          src="../assets/simplelogo.png"
          alt="Logo"
          class="h-12 w-12 object-cover rounded-full"
        />
        <span v-if="!isCollapsed || isMobile" class="font-semibold text-gray-800">SYCAMORE</span>
      </div>
    </div>

    <div class="p-4">
      <ul class="space-y-2">
        <li>
          <router-link
            to="/"
            :class="[
              'flex items-center gap-3 p-3 rounded-lg transition-colors',
              isActive('/') ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100',
            ]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="isActive('/') ? 'text-white' : 'text-gray-400'"
            >
              <path
                d="M11.0232 2.24012C10.4214 1.77201 9.57866 1.77201 8.97682 2.24012L1.99033 7.67404C1.36337 8.16168 1.70823 9.16667 2.50247 9.16667H3.33337V15.8333C3.33337 16.7538 4.07956 17.5 5.00003 17.5H8.33332V12.5C8.33332 11.5795 9.07949 10.8333 9.99999 10.8333C10.9205 10.8333 11.6667 11.5795 11.6667 12.5V17.5H15.0001C15.9205 17.5 16.6667 16.7538 16.6667 15.8333V9.16667H17.4976C18.291 9.16667 18.6373 8.16219 18.0097 7.67404L11.0232 2.24012Z"
                fill="currentColor"
              />
            </svg>
            <span v-if="!isCollapsed || isMobile" class="font-medium">Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/customers"
            :class="[
              'flex items-center gap-3 p-3 rounded-lg transition-colors',
              isActive('/customers') ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100',
            ]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="isActive('/customers') ? 'text-white' : 'text-gray-400'"
            >
              <path
                d="M5.83334 2.50002V3.33335C5.83334 4.25383 6.57954 5.00002 7.50001 5.00002H12.5C13.4205 5.00002 14.1667 4.25383 14.1667 3.33335V2.50002H15C15.9205 2.50002 16.6667 3.24621 16.6667 4.16669V13.3334C16.6667 16.0948 14.4281 18.3334 11.6667 18.3334H5.00001C4.07954 18.3334 3.33334 17.5872 3.33334 16.6667V4.16669C3.33334 3.24621 4.07954 2.50002 5.00001 2.50002H5.83334Z"
                fill="currentColor"
              />
            </svg>
            <span v-if="!isCollapsed || isMobile" class="font-medium">Customers</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

defineProps({
  isCollapsed: {
    type: Boolean,
    required: true,
  },
  isMobile: {
    type: Boolean,
    required: true,
  },
})

const route = useRoute()

function isActive(path) {
  return route.path === path
}
</script>

<style scoped>
.sidebar {
  width: 280px;
  transition: all 0.3s ease;
  position: relative;
}

.sidebar.collapsed:not(.mobile) {
  width: 80px;
}

/* Mobile styles */
.sidebar.mobile {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 80%;
  transform: translateX(0);
}

.sidebar.mobile.collapsed {
  transform: translateX(-100%);
}

.sidebar.hidden {
  display: none;
}
</style>
