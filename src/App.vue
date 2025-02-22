<template>
  <div>
    <NavBar />
    <router-view />
  </div>
</template>
<script setup>
import NavBar from "@/components/NavBar.vue";
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  position: absolute;
}

::-webkit-scrollbar-thumb {
  background-color: #1890ff;
}

::-webkit-scrollbar-track {
  background-color: #ddd;
}
</style>
