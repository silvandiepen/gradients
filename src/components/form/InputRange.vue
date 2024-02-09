<template>
    <div :class="bemm()">
        <label :class="bemm('label')" v-if="label">
            {{ label }}
        </label>

        <div :class="bemm('control-container')">
            <span :class="bemm('value')">{{ value }}</span>
            <input :class="bemm('control')" :placeholder="placeholder" type="range" v-model="value" :min="min" :max="max"
                :step="step" />
        </div>
    </div>
</template>

<script lang="ts" setup>

import { useBemm } from 'bemm';
const bemm = useBemm('input-range');

defineProps({
    label: {
        type: String,
        default: ""
    },
    placeholder: {
        type: String,
        default: ""
    },
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: 100
    },
    step: {
        type: Number,
        default: 1

    }
})
const value = defineModel()
</script>
<style lang="scss" src="./Form.scss"></style>