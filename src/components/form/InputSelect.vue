<template>
    <div :class="bemm()">
        <label :class="bemm('label')" v-if="label">
            {{ label }}
        </label>

        <div :class="bemm('control-container')">
            <select :class="bemm('control')" :placeholder="placeholder" v-model="value">
                <option v-for="option in optionsObject" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useBemm } from 'bemm';
import { PropType, computed } from 'vue';
const bemm = useBemm('input-select');

interface Option {
    label: string;
    value: string;
}
const props = defineProps({
    label: {
        type: String,
        default: ""
    },
    placeholder: {
        type: String,
        default: ""
    }, options: {
        type: Array as PropType<string[] | Option[]>,
        default: () => []
    }
})
const value = defineModel()

const optionsObject = computed<Option[]>(() => {
    return props.options.map((option: string | Option) => {
        if (typeof option === 'string') {
            return {
                label: option,
                value: option
            }
        } else if (option.label && option.value) {
            return option
        } else {
            console.log(option)
            throw new Error('Invalid option')
        }
    })
})
</script>


<style lang="scss" src="./Form.scss"></style>