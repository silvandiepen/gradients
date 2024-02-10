<template>
    <div :class="bemm()">

        <InputSelect label="Gradient type" v-model="type" :options="Object.values(GradientType)"></InputSelect>

        <div :class="bemm('type-options')">
            <div @click="type = GradientType.LINEAR"
                :class="[bemm('option'), bemm('option', 'linear'), bemm('option', type === GradientType.LINEAR ? 'active' : 'inactive')]">
            </div>
            <div @click="type = GradientType.RADIAL"
                :class="[bemm('option'), bemm('option', 'radial'), bemm('option', type === GradientType.RADIAL ? 'active' : 'inactive')]">
            </div>
            <div @click="type = GradientType.CONIC"
                :class="[bemm('option'), bemm('option', 'conic'), bemm('option', type === GradientType.CONIC ? 'active' : 'inactive')]">
            </div>
        </div>

        <FormField label="Direction" v-if="type === GradientType.LINEAR">
            <InputSwitch v-model="linearUse" :values="['direction', 'angle']" />
            <InputSelect v-if="linearUse === 'direction'" v-model="linearDirection"
                :options="Object.values(LinearGradientDirection)" />
            <div v-if="linearUse === 'angle'">
                <InputRange v-model="angle" label="Angle" :min="angleSettings.min" :max="angleSettings.max"
                    :step="angleSettings.step" />
                <InputSelect v-model="angleUnit" label="Unit" :options="Object.values(AngleUnit)" />
            </div>
        </FormField>

        <InputSelect v-if="type === GradientType.RADIAL" v-model="radialShape" label="Shape"
            :options="Object.values(RadialGradientShape)" />


        <FormField v-if="type === GradientType.CONIC || type === GradientType.RADIAL" label="Position">
            <FormGroup>
                <InputNumber v-model="position.x" label="x" />
                <InputNumber v-model="position.y" label="y" />
                <InputSelect v-model="positionUnit" label="Unit" :options="Object.values(PositionUnit)" />
            </FormGroup>
        </FormField>

        <FormField v-if="type === GradientType.CONIC" label="From">
            <FormGroup>
                <InputNumber v-model="from" label="Value" />
                <InputSelect v-model="fromUnit" label="Unit" :options="Object.values(FromUnit)" />
            </FormGroup>
        </FormField>


        <div :class="bemm('stops')">
            <div :class="bemm('stop')" v-for="(stop, index) in stops" :key="index">
                <FormField>
                    <InputColor v-model="stop.color" />
                    <InputRange v-if="stopsUnit == StopsUnit.PERCENT" v-model="stop.position" :min="0" :max="1"
                        :step="0.01" />
                    <InputNumber v-else v-model="stop.position" />
                    <button @click="removeStop(index)">-</button>

                </FormField>
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
import { computed, watch } from 'vue';
import { FromUnit, GradientType, LinearGradientDirection, PositionUnit, RadialGradientShape, StopsUnit, AngleUnit } from '@/types';
import { useBemm } from 'bemm';

import { useGradient } from '@/composables/useGradient';

const { type, linearDirection, linearUse, angle, radialShape, stops, position, positionUnit, from, fromUnit, gradient, stopsUnit, angleUnit } = useGradient();

import { InputSelect, InputNumber, FormGroup, FormField, InputColor, InputRange, InputSwitch } from '@/components/form';
import { convertAngle } from '@/utils/convert';

const bemm = useBemm('settings');


const removeStop = (index: number) => {
    stops.value.splice(index, 1);
};
const addStop = () => {
    stops.value.push({ color: '#000000', position: 0 });
};

const angleSettings = computed(() => {
    switch (angleUnit.value) {
        case AngleUnit.GRAD:
            return { min: 0, max: 400, step: 1 };
        case AngleUnit.TURN:
            return { min: 0, max: 1, step: 0.01 };
        case AngleUnit.RAD:
            return { min: 0, max: 2 * Math.PI, step: Math.PI / 180 };
        case AngleUnit.DEG:
        default:
            return { min: 0, max: 360, step: 1 };
    }
});

watch(() => angleUnit.value, (to, from) => {
    angle.value = convertAngle(angle.value,from, to);
});

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

    &__stop {}


    &__type-options {
        display: flex;
        gap: 1em;
    }

    &__option {
        // background-color: red;
        width: 3em;
        height: 3em;
        border-radius: var(--border-radius);

        --gradient-color: var(--foreground);

        &::before {
            content: "";
            height: 100%;
            width: 100%;
            display: block;
            // margin: .5em;
            border-radius: var(--border-radius);
            box-shadow: 0 0 0 2px rgba(255, 255, 255, .25) inset;

            // border: 2px solid rgba(255,255,255,.25);
        }

        &--active {
            --gradient-color: var(--secondary);
        }

        &--active::before {
            box-shadow: 0 0 0 2px rgba(var(--foreground-rgb), 1) inset;
            --color: var(--primary);
        }

        &--linear::before {
            background-image: linear-gradient(to bottom, var(--gradient-color), transparent);
        }

        &--radial::before {
            background-image: radial-gradient(var(--gradient-color), transparent);
        }

        &--conic::before {
            background-image: conic-gradient(var(--gradient-color), transparent);
        }
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
