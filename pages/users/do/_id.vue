<template>
  <Page :title="title">
    <template #header>
      <gv-breadcrumb :title="title">
        <gv-breadcrumb-item
          :label="$t('page.home.title')"
          :href="$resolve.home()"
        />
        <gv-breadcrumb-item
          :label="$t('page.users.title')"
          :href="$resolve.users()"
        />
      </gv-breadcrumb>
    </template>
    <template v-if="isUpdate" #action>
      <gv-button :href="$resolve.user()" primary>
        {{ $t('action.create') }} <gv-icon value="plus" />
      </gv-button>
    </template>
    <template #content>
      <Feedback />
      <PageLoading v-if="$fetchState.pending" />
      <PageForm v-else :is-update="isUpdate" @onsubmit="onSubmit">
        <gv-row>
          <gv-col sm="6">
            <gv-input
              v-model="name"
              v-validation.required
              :label="$t('label.name')"
              minlength="5"
            />
          </gv-col>
          <gv-col sm="6">
            <Username
              :id="user._id"
              v-model="username"
              @onchange="usernameValidation"
            />
          </gv-col>
          <gv-col sm="6">
            <Password v-model="password" @onchange="passwordValidation" />
          </gv-col>
          <gv-col sm="6">
            <Email :id="user._id" v-model="email" />
          </gv-col>
          <gv-col>
            <gv-form-group :label="$tc('label.role', 1)">
              <InputGroup v-model="roles" :items="roleDropdown" />
            </gv-form-group>
          </gv-col>
        </gv-row>
      </PageForm>
    </template>
  </Page>
</template>

<script>
import { mapState } from 'vuex'
import { enums, helpers } from 'utils'
import { Page } from '@/components'
import {
  Email,
  Feedback,
  InputGroup,
  Password,
  Username,
} from '@/components/form'
import { PageForm, PageLoading } from '@/components/helper'
export default {
  components: {
    Email,
    Feedback,
    InputGroup,
    Page,
    PageForm,
    PageLoading,
    Password,
    Username,
  },
  data() {
    return {
      invalidUsername: false,
      invalidPassword: false,
    }
  },
  async fetch() {
    const { error, params, $service } = this.$nuxt.context
    try {
      if (params.id) {
        await $service.user.find(params.id)
      } else {
        await $service.user.clear()
      }
    } catch (err) {
      error({
        statusCode: 503,
        message: 'Unable to fetch',
      })
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  computed: {
    ...mapState('user', ['user']),
    isUpdate() {
      return !!this.user._id
    },
    title() {
      return this.isUpdate
        ? this.$t('page.users.update')
        : this.$t('page.users.create')
    },
    name: {
      set(name) {
        this.$service.user.set({ name })
      },
      get() {
        return this.user.name
      },
    },
    username: {
      set(username) {
        this.$service.user.set({ username })
      },
      get() {
        return this.user.username
      },
    },
    password: {
      set(password) {
        this.$service.user.set({ password })
      },
      get() {
        return null
      },
    },
    email: {
      set(email) {
        this.$service.user.set({ email })
      },
      get() {
        return this.user.email
      },
    },
    roles: {
      set(roles) {
        this.$service.user.set({ roles: [...roles] })
      },
      get() {
        return this.user.roles
      },
    },
    roleDropdown() {
      return helpers.toDropdownList(enums.roles, this.$i18n)
    },
  },
  beforeDestroy() {
    this.$service.user.clear()
  },
  methods: {
    onSubmit() {
      if (this.invalidUsername || this.invalidPassword) return
      try {
        if (this.isUpdate) {
          this.$service.user.update()
        } else {
          this.$service.user.create(this.user)
        }
        this.$service.session.feedback(this.$t('message.feedback.form.success'))
      } catch (err) {
        this.$service.session.feedback(
          this.$t('message.feedback.form.error'),
          true
        )
      }
    },
    usernameValidation(error) {
      this.invalidUsername = error
    },
    passwordValidation(error) {
      this.invalidPassword = error
    },
  },
}
</script>
