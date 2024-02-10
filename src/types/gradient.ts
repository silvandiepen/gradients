export interface GradientStop {
    color: string;
    position: number;
}
export const GradientType = {
    RADIAL: 'radial',
    LINEAR: 'linear',
    CONIC: 'conic',
} as const;

export type GradientType = typeof GradientType[keyof typeof GradientType];

export const LinearGradientDirection = {
    TO_TOP: 'to top',
    TO_TOP_RIGHT: 'to top right',
    TO_RIGHT: 'to right',
    TO_BOTTOM_RIGHT: 'to bottom right',
    TO_BOTTOM: 'to bottom',
    TO_BOTTOM_LEFT: 'to bottom left',
    TO_LEFT: 'to left',
    TO_TOP_LEFT: 'to top left',
} as const;
export type LinearGradientDirection = typeof LinearGradientDirection[keyof typeof LinearGradientDirection];

export const RadialGradientShape = {
    CLOSEST_SIDE: 'closest-side',
    CIRCLE: 'circle',
    ELLIPSE: 'ellipse',
} as const;
export type RadialGradientShape = typeof RadialGradientShape[keyof typeof RadialGradientShape];



export const PositionUnit = {
    PX: 'px',
    PERCENT: '%',
    EM: 'em',
    REM: 'rem',
    VW: 'vw',
    VH: 'vh',
    VMIN: 'vmin',
    VMAX: 'vmax',
} as const;
export type PositionUnit = typeof PositionUnit[keyof typeof PositionUnit];

export const FromUnit = {
    RAD: 'rad',
    DEG: 'deg',
    TURN: 'turn',
    GRAD: 'grad',
} as const;
export type FromUnit = typeof FromUnit[keyof typeof FromUnit];

export const AngleUnit = {
    RAD: 'rad',
    DEG: 'deg',
    TURN: 'turn',
    GRAD: 'grad',
} as const;
export type AngleUnit = typeof AngleUnit[keyof typeof AngleUnit];

export const StopsUnit = {
    PX: 'px',
    PERCENT: '%',
    EM: 'em',
    REM: 'rem',
    VW: 'vw',
    VH: 'vh',
    VMIN: 'vmin',
    VMAX: 'vmax',
} as const;
export type StopsUnit = typeof StopsUnit[keyof typeof StopsUnit];