<template>
    <div :class="gradientClasses">
        <div :class="bemm('gradient')" :style="`background-image: ${gradient}`">
        </div>

    </div>
</template>

<script setup lang="ts">
import { useBemm } from 'bemm';
import { computed } from 'vue';
const bemm = useBemm('gradient');

import { useGradient } from '@/composables/useGradient';

const { gradient } = useGradient();

const gradientClasses = computed(() => {
    return [bemm()];
});
</script>

<style lang="scss">
.gradient {
    width: 100%;
    height: 100%;
    padding: 2em;
    &__gradient{
        width: 100%;
        height: 100%;
    }

}
</style>