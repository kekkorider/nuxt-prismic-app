<template>
  <div>
    <main-nav/>
    <nuxt/>
  </div>
</template>

<script>
import MainNav from '@/components/MainNav.vue'

export default {
  components: {
    MainNav
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  background-color: #fafafa;
  margin: 0;
}

a {
  text-decoration: none;
  color: #5CBEFD;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}
</style>
