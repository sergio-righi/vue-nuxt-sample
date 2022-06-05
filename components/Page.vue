<template>
  <section class="section-page">
    <section v-if="hasTitle || hasHeader" class="section-header">
      <div v-if="hasTitle || hasAction" class="section-title">
        <span>{{ title }}</span>
        <div v-if="hasAction" class="section-action">
          <slot name="action" />
        </div>
      </div>
      <slot name="header" />
    </section>
    <section v-if="hasFilter" class="section-filter">
      <slot name="filter" />
    </section>
    <section v-if="hasContent" class="section-content">
      <slot name="content" />
    </section>
    <section v-if="hasFooter" class="section-footer">
      <slot name="footer" />
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const Props = Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
})

@Component
export default class Page extends Props {
  get hasHeader(): boolean {
    return !!this.$slots.header || this.hasAction
  }

  get hasAction(): boolean {
    return !!this.$slots.action
  }

  get hasFilter(): boolean {
    return !!this.$slots.filter
  }

  get hasContent(): boolean {
    return !!this.$slots.content
  }

  get hasFooter(): boolean {
    return !!this.$slots.footer
  }

  get hasTitle(): boolean {
    return !!this.title
  }
}
</script>
