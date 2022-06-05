<template>
  <div class="no-record-container">
    <div class="no-record-icon">
      <gv-emoji value="expressionless" />
    </div>
    <div class="no-record-description">
      <p>{{ $t('message.feedback.fetch.no_record.title') }}</p>
      <p>{{ $t('message.feedback.fetch.no_record.subtitle') }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NoRecord extends Vue {}
</script>
