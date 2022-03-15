<template>
  <Page>
    <template #content>
      {{ data }}
    </template>
  </Page>
</template>

<script>
import { Page } from 'components'
export default {
  components: {
    Page,
  },
  data: () => ({
    data: [],
  }),
  async fetch() {
    const { $service, error } = this.$nuxt.context
    try {
      this.data = await $service.todo.all()
    } catch (err) {
      error({
        statusCode: 503,
        message: 'Unable to fetch',
      })
    }
  },
}
</script>
