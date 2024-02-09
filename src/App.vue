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
  height: 100vh; 
  &__settings {
    padding: 1em;
    // position: absolute;
  }

  &__gradient {
    // border: 2px solid red;
  }
}
</style>
