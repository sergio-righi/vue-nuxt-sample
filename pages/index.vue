<template>
  <Page>
    <template #content>
      <table v-if="counter > 0">
        <thead>
          <tr>
            <th>Name</th>
            <th colspan="2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in todos" :key="item.id">
            <td>
              <span :class="{ 'line-through': item.deleted }">
                {{ item.name }}
              </span>
            </td>
            <td>
              <a :href="$resolve.todo(item.id)">
                {{ $t('action.update') }}
              </a>
            </td>
            <td>
              <button v-if="item.deleted" @click="onRecover(item.id)">
                {{ $t('action.recover') }}
              </button>
              <button v-else @click="onDelete(item.id)">
                {{ $t('action.delete') }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <NoRecord v-else many />
      <br />
      <button @click="onInsert">{{ $t('action.insert') }}</button>
    </template>
  </Page>
</template>

<script>
import { mapGetters } from 'vuex'
import { Todo } from '@/models'
import { NoRecord, Page } from '@/components'
export default {
  components: {
    Page,
    NoRecord,
  },
  async fetch() {
    const { $service, error } = this.$nuxt.context
    try {
      await $service.todo.all()
    } catch (err) {
      error({
        statusCode: 503,
        message: 'Unable to fetch',
      })
    }
  },
  computed: {
    ...mapGetters('todo', ['todos']),
    counter() {
      return Array.isArray(this.todos) ? this.todos.length : 1
    },
  },
  methods: {
    async onInsert() {
      const todo = new Todo()
      todo.name = `Name Example ${Math.floor(Math.random() * 100)}`
      await this.$service.todo.insert(todo)
    },
    async onDelete(id) {
      await this.$service.todo.delete(id)
    },
    async onRecover(id) {
      await this.$service.todo.recover(id)
    },
  },
}
</script>

<style>
td,
table {
  border-collapse: collapse;
  border: 1px solid black;
}
td {
  padding: 0.5em;
}
.line-through {
  text-decoration: line-through;
}
</style>
