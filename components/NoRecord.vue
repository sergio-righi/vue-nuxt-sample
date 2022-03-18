<template>
  <p v-if="many">{{ $tc('message.feedback.fetch.no_record', 2) }}</p>
  <p v-else>{{ $tc('message.feedback.fetch.no_record', 1) }}</p>
</template>

<script>
export default {
  props: {
    many: Boolean,
  },
}
</script>
