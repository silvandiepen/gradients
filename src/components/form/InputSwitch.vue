<template>
    <div :class="bemm()">
        <div :class="bemm('control-container')">
            <span v-for="(v) in formattedValues" @click="handleClick(v.value)"
                :class="[bemm('value'), bemm('value', `${v.label}`), bemm('value', model === v.value ? 'active' : 'inactive')]">{{
                    v.label }}</span>
        </div>
        <label for="test" :class="bemm('label')" v-if="label">
            {{ label }}
        </label>
    </div>
</template>

<script lang="ts" setup>
import { watch, PropType, computed } from "vue";
import { useBemm } from 'bemm';
const bemm = useBemm('input-switch');
const props = defineProps({
    label: {
        type: String,
        default: ""
    },
    values: {
        type: Array as PropType<string[] | { value: string, label: string }[]>,
        default: ""
    },

})

const model = defineModel()
const emit = defineEmits(["update:modelValue"]);

const formattedValues = computed<{ label: string, value: string }[]>(() => {

    if (typeof props.values[0] == 'string') {
        return props.values.map((v) => {
            return {
                label: v,
                value: v
            }
        })
    }
    else if (typeof props.values[0] == 'object' && props.values[0].value && props.values[0].label) {
        return props.values
    } else {
        return []
    }


})

const handleClick = (value: string) => {
    console.log('something');
    console.log(value);
    emit('update:modelValue', value)
}

</script>


<style lang="scss" src="./Form.scss"></style>