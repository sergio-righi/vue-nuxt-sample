<template>
  <gv-navbar center fixed>
    <template #brand>
      <gv-link :href="$resolve.home()">Brand</gv-link>
    </template>
    <template #menu>
      <gv-navbar-item
        :href="$resolve.users()"
        :active="isActive($resolve.users())"
      >
        {{ $t('page.users.title') }}
      </gv-navbar-item>
    </template>
    <template #control>
      <gv-navbar-item>
        <gv-dropdown left>
          <template #trigger>
            <gv-flexbox align="center" justify="center" flex>
              <gv-avatar bg="white" color="black" sm>
                {{ letter }}
              </gv-avatar>
            </gv-flexbox>
          </template>
          <template #content>
            <gv-dropdown-item @onclick="signOut">
              {{ $t('navbar.sign_out') }}
            </gv-dropdown-item>
          </template>
        </gv-dropdown>
      </gv-navbar-item>
    </template>
  </gv-navbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Navbar extends Vue {
  get letter(): string {
    if (this.$service.session.isAuthenticated()) {
      const user: any = this.$service.session.user()
      return user.name?.slice(0, 1)
    }
    return ''
  }

  signIn() {
    window.location.href = this.$resolve.login(window.location.href)
  }

  signOut() {
    window.location.href = this.$resolve.logout(window.location.href)
  }

  isActive(url: string): boolean {
    return new RegExp(url).test(this.$route.path)
  }
}
</script>
