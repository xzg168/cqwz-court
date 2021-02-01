<template>
  <div class="home">
    <Header />
    <a-layout-content
      :style="{
        padding: '0 20px',
        background: '#fff',
        minHeight: '280px',
        textAlign: 'left'
      }"
    >
      <router-view />
    </a-layout-content>
  </div>
</template>

<script>
import Header from "./layout/Header";
export default {
  name: "Home",
  components: { Header }
};
</script>
