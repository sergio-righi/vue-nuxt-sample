<template>
  <Page>
    <template #content>
      <a :href="$resolve.todo()">{{ $t('action.return') }}</a>
      <template v-if="name.length">
        <p
          v-if="feedback.message"
          :class="{ error: feedback.error, success: !feedback.error }"
        >
          {{ feedback.message }}
        </p>
        <form @submit.prevent="onSubmit">
          <input v-model="name" type="text" />
          <button type="submit">{{ $t('action.save') }}</button>
        </form>
      </template>
      <p v-else-if="$fetchState.pending">{{ $t('message.loading') }}</p>
      <NoRecord v-else />
    </template>
  </Page>
</template>

<script>
import { mapState } from 'vuex'
import { Page, NoRecord } from '@/components'
export default {
  components: {
    Page,
    NoRecord,
  },
  data() {
    return {
      feedback: {
        error: false,
        message: null,
      },
    }
  },
  async fetch() {
    const { $service, error, params } = this.$nuxt.context
    try {
      if (params.id) {
        await $service.todo.find(params.id)
      } else {
        await $service.todo.clear()
      }
    } catch (err) {
      error({
        statusCode: 503,
        message: 'Unable to fetch todo #' + params.id,
      })
    }
  },
  computed: {
    ...mapState('todo', ['todo']),
    name: {
      set(name) {
        this.$service.todo.set({ name })
      },
      get() {
        return this.todo.name
      },
    },
  },
  beforeDestroy() {
    this.$service.todo.clear()
  },
  methods: {
    async onSubmit() {
      try {
        await this.$service.todo.update()
        this.feedback.error = false
        this.feedback.message = this.$t('message.feedback.form.success')
      } catch (err) {
        this.feedback.error = true
        this.feedback.message = this.$t('message.feedback.form.error')
      }
    },
  },
}
</script>

<style>
.error {
  color: red;
}
.success {
  color: green;
}
</style>
