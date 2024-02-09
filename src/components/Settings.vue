<template>
    <div :class="bemm()">

        <select v-model="type">
            <option v-for="t in GradientType" :value="t">{{ t }}</option>
        </select>

        <select v-if="type == GradientType.LINEAR" v-model="linearDirection">
            <option v-for="d in LinearGradientDirection" :value="d">{{ d }}</option>
        </select>

        <select v-if="type === GradientType.RADIAL" v-model="radialShape">
            <option v-for="s in RadialGradientShape" :value="s">{{ s }}</option>
        </select>

        <template v-if="type === GradientType.CONIC || type === GradientType.RADIAL">
            <label>Position X</label>
            <input type="number" v-model="position.x" />

            <label>Position Y</label>
            <input type="number" v-model="position.y" />

            <label>Position Unit</label>
            <select v-model="positionUnit">
                <option v-for="u in PositionUnit" :value="u">{{ u }}</option>
            </select>
        </template>

        <template v-if="type === GradientType.CONIC">
            <label>From</label>
            <input type="number" v-model="from" />

            <label>From Unit</label>
            <select v-model="fromUnit">
                <option v-for="u in FromUnit" :value="u">{{ u }}</option>
            </select>
        </template>


        <div :class="bemm('stops')">
            <div :class="bemm('stop')" v-for="(stop, index) in stops" :key="index">
                <input type="color" v-model="stop.color" />
                <input type="number" v-model="stop.position" />
                <button @click="removeStop(index)">-</button>
            </div>
            <button @click="addStop">+</button>
        </div>
        <label>Stops Unit</label>
        <select v-model="stopsUnit">
            <option v-for="u in StopsUnit" :value="u">{{ u }}</option>
        </select>



        <div :class="bemm('code')">
            {{ gradient }}
        </div>

    </div>
</template>

<script setup lang="ts">
// import { computed } from 'vue';
import { FromUnit, GradientType, LinearGradientDirection, PositionUnit, RadialGradientShape, StopsUnit } from '@/types';
import { useBemm } from 'bemm';

import { useGradient, } from '@/composables/useGradient';

const { type, linearDirection, radialShape, stops, position, positionUnit, from, fromUnit, gradient, stopsUnit } = useGradient();

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
        display: flex;
        gap: 1em;
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
        background-color: #f4f4f4;

    }
}
</style>
