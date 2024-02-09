<template>
    <div :class="bemm()">

        <InputSelect label="Gradient type" v-model="type" :options="Object.values(GradientType)"></InputSelect>

        <InputSelect v-if="type == GradientType.LINEAR" v-model="linearDirection" label="Direction"
            :options="Object.values(LinearGradientDirection)" />

        <InputSelect v-if="type === GradientType.RADIAL" v-model="radialShape" label="Shape"
            :options="Object.values(RadialGradientShape)" />


        <InputGroup label="Position" v-if="type === GradientType.CONIC || type === GradientType.RADIAL">

            <InputNumber v-model="position.x" label="x" />
            <InputNumber v-model="position.y" label="y" />
            <InputSelect v-model="positionUnit" label="Unit" :options="Object.values(PositionUnit)" />
        </InputGroup>

        <InputGroup label="From" v-if="type === GradientType.CONIC">
            <InputNumber v-model="from" label="Value" />
            <InputSelect v-model="fromUnit" label="Unit" :options="Object.values(FromUnit)" />
        </InputGroup>


        <div :class="bemm('stops')">
            <div :class="bemm('stop')" v-for="(stop, index) in stops" :key="index">
                <InputColor v-model="stop.color" />
                <InputRange v-if="stopsUnit == StopsUnit.PERCENT" v-model="stop.position" :min="0" :max="1" :step="0.01" />
                <InputNumber v-else v-model="stop.position" />
                <button @click="removeStop(index)">-</button>
            </div>
            <button @click="addStop">+</button>
        </div>

        <InputSelect v-model="stopsUnit" label="Stops Unit" :options="Object.values(StopsUnit)" />



        <div :class="bemm('code')">
            {{ gradient }}
        </div>

    </div>
</template>

<script setup lang="ts">
// import { computed } from 'vue';
import { FromUnit, GradientType, LinearGradientDirection, PositionUnit, RadialGradientShape, StopsUnit } from '@/types';
import { useBemm } from 'bemm';

import { useGradient } from '@/composables/useGradient';

const { type, linearDirection, radialShape, stops, position, positionUnit, from, fromUnit, gradient, stopsUnit } = useGradient();

import { InputSelect, InputNumber, InputGroup, InputColor, InputRange } from '@/components/form';

const bemm = useBemm('settings');


const removeStop = (index: number) => {
    stops.value.splice(index, 1);
};
const addStop = () => {
    stops.value.push({ color: '#000000', position: 0 });
};

</script>

<style lang="scss">
.settings {
    display: flex;
    flex-direction: column;
    gap: 1em;

    &__stops {
        display: flex;
        flex-direction: column;
        gap: 1em;

    }

    &__stop {
        padding: var(--space);
        background-color: color-mix(in oklch, var(--background) 100%, black 50%);
        border-radius: var(--border-radius);
        display: flex;
        flex-direction: column;
        gap: var(--space);
        justify-content: space-between;
    }

    button {
        width: 1.5em;
        height: 1.5em;
        line-height: 1.5;
        border-radius: 50%;
        border: none;
        background-color: #313131;
        color: white;
        font-weight: bold;
    }

    &__code {
        white-space: pre-wrap;
        font-family: monospace;
        padding: 1em;
        background-color: rgba(var(--foreground-rgb), .25);
        border-radius: var(--border-radius);
        font-size: .875em;
    }
}
</style>
