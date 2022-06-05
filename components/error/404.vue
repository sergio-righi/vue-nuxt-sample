<template>
  <p>Customized 404 error page</p>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const Props = Vue.extend({
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
})

@Component
export default class Error404 extends Props {}
</script>
