<script setup></script>

<template>
  <main>
    <div class="container w-full flex flex-col items-start gap-12">
      <h3>Dashboard</h3>
      <div class="content w-full h-full flex items-center justify-center flex-col gap-4">
        <img src="../assets/empty_page.svg" class="w-full h-[30vh]" alt="" />
        <h5 class="text-center text-md">Hey there's nothing here, check the customer page</h5>
        <div class="flex gap-2 items-center">
          <router-link to="/customers" class="text-blue-500 text-sm"
            >Go to Customer Page</router-link
          >
          <p>or</p>
          <a class="text-blue-500 text-sm" href="http://">Check out the Codily Test</a>
        </div>
      </div>
    </div>
  </main>
</template>
