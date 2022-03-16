<template>
  <Page>
    <template #content>
      <table v-if="counter > 0">
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in todos" :key="item.id">
            <td>{{ item.name }}</td>
            <td>
              <button @click="onDelete(item.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="onInsert">Insert</button>
    </template>
  </Page>
</template>

<script>
import { Todo } from 'models'
import { Page } from 'components'
import { mapGetters } from 'vuex'
export default {
  components: {
    Page,
  },
  // the data property must be declared like this in order to access it from fetch
  // data: () => ({
  //   data: [],
  // }),
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
      todo.name = `Name Example ${this.counter}`
      await this.$service.todo.insert(todo)
    },
    async onDelete(id) {
      await this.$service.todo.delete(id)
    },
  },
}
</script>
