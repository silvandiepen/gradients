<template>
    <div :class="bemm()">
        <label :class="bemm('label')" v-if="label">
            {{ label }}
        </label>
        <div :class="bemm('control-container')">
            <textarea v-on:input="autoGrow" :style="`height: ${controlHeight}px`" :class="bemm('control')"
                :placeholder="placeholder" v-model="value"></textarea>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useBemm } from 'bemm';
const bemm = useBemm('input-textarea');

defineProps({
    label: {
        type: String,
        default: ""
    },
    placeholder: {
        type: String,
        default: ""
    }
})
const value = defineModel({ type: String })

const controlHeight = ref(0);

const autoGrow = (event: Event | HTMLTextAreaElement) => {
    let element: HTMLTextAreaElement | null = null;
    if ((event as Event).target) {
        element = (event as Event).target as HTMLTextAreaElement;
    } else {
        element = event as HTMLTextAreaElement;
    }
    controlHeight.value = 5;
    controlHeight.value = element.scrollHeight;

}
onMounted(() => {
    autoGrow(document.querySelector(`.${bemm('control')}`) as HTMLTextAreaElement);
});
</script>



<style lang="scss" src="./Form.scss"></style>