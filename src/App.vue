<script setup lang="ts">
import { useBemm } from 'bemm';
import Gradient from '@/components/Gradient.vue';
import Settings from '@/components/Settings.vue';

const bemm = useBemm('app');
</script>

<template>
  <div :class="bemm()">
    <Settings :class="bemm('settings')" />
    <Gradient :class="bemm('gradient')" />
  </div>
</template>

<style lang="scss">
.app {
  display: flex;
 min-height: 100vh;
  &__settings {
    padding: var(--space);
    width: 320px;
    flex-shrink: 0;
    // position: absolute;
  }

  &__gradient {
    // border: 2px solid red;
    padding: 1em;
    position: relative;
  }
}
</style>
