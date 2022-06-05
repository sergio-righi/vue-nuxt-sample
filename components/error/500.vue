<template>
  <p>Customized 500 error page {{ error }}</p>
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
export default class Error500 extends Props {}
</script>
