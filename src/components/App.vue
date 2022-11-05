<template>
  <md-app
    v-cloak
    md-waterfall
    md-mode="fixed"
  >
    <md-app-toolbar class="md-primary md-dense">
      <div class="md-toolbar-section-start">
        <router-link
          to="/"
          class="md-title"
        >
          Text to Speech - Speech to Text
        </router-link>
      </div>
    </md-app-toolbar>

    <md-app-content>
      <router-view />
    </md-app-content>
  </md-app>
</template>

<script>
export default {
    name: 'App',

    components: {
    },

    methods: {
    },
}
</script>

<style scoped>
</style>
