<template>
    <div :class="bemm()">
        <div :class="bemm('control-container')">
            <input id="test" :class="bemm('control')" type="checkbox" v-model="value" />
            <span :class="bemm('control-switch')"></span>

        </div>
        <label for="test" :class="bemm('label')" v-if="label">
            {{ label }}
        </label>
    </div>
</template>

<script lang="ts" setup>
import { useBemm } from 'bemm';
const bemm = useBemm('input-checkbox');

defineProps({
    label: {
        type: String,
        default: ""
    },
})
const value = defineModel()
</script>


<style lang="scss" src="./Form.scss"></style>