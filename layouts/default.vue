<template>
  <div id="main">
    <Navbar />
    <gv-container id="container">
      <gv-row id="content">
        <Nuxt />
      </gv-row>
    </gv-container>
    <v-idle
      class="d-none"
      :loop="true"
      :reminders="[10, 15]"
      :wait="5"
      :duration="300"
      @idle="onidle"
      @remind="onremind"
    />
  </div>
</template>

<script>
import { Navbar } from '@/components'
export default {
  components: {
    Navbar,
  },
  beforeMount() {
    // document.documentElement.setAttribute('theme', 'dark')
  },
  methods: {
    onidle() {
      this.$service.session.logout()
    },
    onremind(time) {
      console.log(time)
    },
  },
}
</script>
