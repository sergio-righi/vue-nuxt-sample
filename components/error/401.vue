<template>
  <p>Customized 401 error page</p>
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
export default class Error401 extends Props {}
</script>
