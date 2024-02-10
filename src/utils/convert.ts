import { AngleUnit } from "@/types";

// Degrees to Radians
export function degToRad(degrees: number): number {
    return degrees * Math.PI / 180;
}

// Radians to Degrees
export function radToDeg(radians: number): number {
    return radians * 180 / Math.PI;
}

// Turns to Degrees
export function turnToDeg(turns: number): number {
    return turns * 360;
    
}

// Degrees to Turns
export function degToTurn(degrees: number): number {
    return degrees / 360;
}

// Radians to Turns
export function radToTurn(radians: number): number {
    return radians / (2 * Math.PI);
}

// Turns to Radians
export function turnToRad(turns: number): number {
    return turns * (2 * Math.PI);
}

// Degrees to Gradians
export function degToGrad(degrees: number): number {
    return degrees * 400 / 360;
}

// Gradians to Degrees
export function gradToDeg(grads: number): number {
    return grads * 360 / 400;
}

// Create one function which will convert any angle to any other angle
export function convertAngle(value: number, from: AngleUnit, to: AngleUnit): number {
    if (from === AngleUnit.DEG && to === AngleUnit.RAD) {
        return degToRad(value);
    }
    if (from === AngleUnit.RAD && to === AngleUnit.DEG) {
        return radToDeg(value);
    }
    if (from === AngleUnit.TURN && to === AngleUnit.DEG) {
        return turnToDeg(value);
    }
    if (from === AngleUnit.DEG && to === AngleUnit.TURN) {
        return degToTurn(value);
    }
    if (from === AngleUnit.RAD && to === AngleUnit.TURN) {
        return radToTurn(value);
    }
    if (from === AngleUnit.TURN && to === AngleUnit.RAD) {
        return turnToRad(value);
    }
    if (from === AngleUnit.DEG && to === AngleUnit.GRAD) {
        return degToGrad(value);
    }
    if (from === AngleUnit.GRAD && to === AngleUnit.DEG) {
        return gradToDeg(value);
    }
    return value;
}
