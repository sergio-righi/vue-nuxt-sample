<template>
  <Page :title="title">
    <template #content>
      <gv-row> </gv-row>
    </template>
  </Page>
</template>

<script>
import { Page } from '@/components'

export default {
  name: 'Home',
  components: {
    Page,
  },
  data() {
    return {
      title: this.$t('page.home.title'),
    }
  },
}
</script>
