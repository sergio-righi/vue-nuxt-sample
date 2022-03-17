<template>
  <section class="section-page">
    <section v-if="hasHeader" class="section-header">
      <slot name="header" />
    </section>
    <section v-if="hasContent" class="section-content">
      <slot name="content" />
    </section>
    <section v-if="hasFooter" class="section-footer">
      <slot name="footer" />
    </section>
  </section>
</template>

<script>
export default {
  computed: {
    hasHeader() {
      return !!this.$slots.header
    },
    hasContent() {
      return !!this.$slots.content
    },
    hasFooter() {
      return !!this.$slots.footer
    },
  },
}
</script>
