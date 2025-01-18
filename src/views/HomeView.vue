<script setup></script>

<template>
  <main>
    <div class="container w-full flex flex-col items-start gap-12">
      <h3>Dashboard</h3>
      <div class="content w-full h-full flex items-center justify-center flex-col gap-4">
        <img src="../assets/empty_page.svg" class="w-full h-[30vh]" alt="" />
        <h5>Hey there's nothing here, check the customer page</h5>
        <router-link to="/customers" class="text-blue-500">Go to Customer Page</router-link>
      </div>
    </div>
  </main>
</template>
