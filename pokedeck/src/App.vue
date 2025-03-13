<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <header>
    <NavBar/>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>  
header{
width: 200px;
}
main{
  width: 1000px;  
}
</style>
