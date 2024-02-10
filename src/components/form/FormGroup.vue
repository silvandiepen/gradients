<template>
    <div :class="bemm()">
        <label :class="bemm('label')" v-if="label">
            {{ label }}
        </label>
        <div :class="bemm('container')">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { useBemm } from 'bemm';

const bemm = useBemm('form-group');

defineProps({
    label: {
        type: String,
        default: ""
    }
})
</script>
<style lang="scss" src="./Form.scss"></style>

