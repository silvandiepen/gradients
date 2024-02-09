import { reactive, computed } from "vue";
import { GradientType, GradientStop, LinearGradientDirection, RadialGradientShape, PositionUnit, FromUnit, StopsUnit } from "@/types";


const gradientState = reactive<{
    type: GradientType
    angle: number;
    stops: GradientStop[];
    stopsUnit: StopsUnit,
    linearDirection: LinearGradientDirection,
    radialShape: RadialGradientShape,
    position: {
        x: number,
        y: number
    },
    positionUnit: PositionUnit,
    from: number,
    fromUnit: FromUnit

}>({
    type: 'linear',
    angle: 0,
    stops: [
        { color: '#ff0000', position: 0 },
        { color: '#00ff00', position: 0.5 },
        { color: '#0000ff', position: 1 },
    ],
    stopsUnit: StopsUnit.PERCENT,
    linearDirection: LinearGradientDirection.TO_BOTTOM,
    radialShape: RadialGradientShape.CIRCLE,
    position: {
        x: 50,
        y: 50
    },
    positionUnit: '%',
    from: 0,
    fromUnit: FromUnit.DEG
});

export const useGradient = () => {


    return {
        type: computed({
            get() {
                return gradientState.type;
            }, set(value: GradientType) {
                gradientState.type = value;
            }
        }),
        angle: computed({
            get() {
                return gradientState.angle;
            }, set(value: number) {
                gradientState.angle = value;
            }
        }),
        stops: computed({
            get() {
                return gradientState.stops;
            }, set(value: GradientStop[]) {
                gradientState.stops = value;
            }
        }),
        stopsUnit: computed({
            get() {
                return gradientState.stopsUnit;
            }, set(value: StopsUnit) {
                gradientState.stopsUnit = value;
            }
        }),
        gradient: computed(() => {

            const stopFormat = (color: string, position: number, unit: StopsUnit) => {
                if (unit === StopsUnit.PERCENT) {
                    return `${color} ${position * 100}%`;
                }
                return `${color} ${position}${unit}`;

            }
            const stops = gradientState.stops.map(stop => `${stopFormat(stop.color, stop.position, gradientState.stopsUnit)}`).join(', ');


            if (gradientState.type === 'radial') {

                const shape = gradientState.radialShape;
                let pre = `${shape}`;
                let position = '';

                if (gradientState.position.x !== 50 || gradientState.position.y !== 50) {
                    position = gradientState.positionUnit === 'px' ? `${gradientState.position.x}px ${gradientState.position.y}px` : `${gradientState.position.x}% ${gradientState.position.y}%`;
                }

                if (position) {
                    pre = `${shape} at ${position}`;
                }


                return `${gradientState.type}-gradient(${pre}, ${stops})`;
            }
            if (gradientState.type === 'conic') {


                let pre = '';
                let from = '';

                let position = '';
                if (gradientState.position.x !== 50 || gradientState.position.y !== 50) {
                    position = gradientState.positionUnit === 'px' ? `${gradientState.position.x}px ${gradientState.position.y}px` : `${gradientState.position.x}% ${gradientState.position.y}%`;
                }

                if (gradientState.from && gradientState.fromUnit) {
                    from = `${gradientState.from}${gradientState.fromUnit}`;
                }

                if (position || from) {
                    if (position && from) {
                        pre = `from ${from} at ${position}`;
                    }
                    else {
                        pre = position || `from ${from}`;
                    }

                }



                return `${gradientState.type}-gradient(${pre ? pre + ',' : ''}${stops})`;
            }
            if (gradientState.type === 'linear') {
                return `${gradientState.type}-gradient(${gradientState.linearDirection}, ${stops})`;
            }

            return ``;
        }),
        linearDirection: computed({
            get() {
                return gradientState.linearDirection;
            }, set(value: LinearGradientDirection) {
                gradientState.linearDirection = value;
            }
        }),
        radialShape: computed({
            get() {
                return gradientState.radialShape;
            }, set(value: RadialGradientShape) {
                gradientState.radialShape = value;
            }
        }),
        position: computed({
            get() {
                return gradientState.position;
            }, set(value: { x: number; y: number }) {
                gradientState.position = value;
            }
        }),
        positionUnit: computed({
            get() {
                return gradientState.positionUnit;
            }, set(value: PositionUnit) {
                gradientState.positionUnit = value;
            }
        }),
        from: computed({
            get() {
                return gradientState.from;
            }, set(value: number) {
                gradientState.from = value;
            }
        }),
        fromUnit: computed({
            get() {
                return gradientState.fromUnit;
            }, set(value: FromUnit) {
                gradientState.fromUnit = value;
            }
        }),
    };
}