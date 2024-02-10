import { describe, it, expect } from "vitest";
import { convertAngle, degToRad, radToDeg, turnToDeg, degToTurn, radToTurn, turnToRad, degToGrad, gradToDeg } from './convert';
import { AngleUnit } from "@/types";

describe('degToRad function', () => {
    it('should convert degrees to radians', () => {
        expect(degToRad(90)).toBeCloseTo(Math.PI / 2);
    });
});

describe('radToDeg function', () => {
    it('should convert radians to degrees', () => {
        expect(radToDeg(Math.PI / 2)).toBeCloseTo(90);
    });
});

describe('turnToDeg function', () => {
    it('should convert turns to degrees', () => {
        expect(turnToDeg(0.5)).toBeCloseTo(180);
    });
});

describe('degToTurn function', () => {
    it('should convert degrees to turns', () => {
        expect(degToTurn(180)).toBeCloseTo(0.5);
    });
});

describe('radToTurn function', () => {
    it('should convert radians to turns', () => {
        expect(radToTurn(Math.PI)).toBeCloseTo(0.5);
    });
});

describe('turnToRad function', () => {
    it('should convert turns to radians', () => {
        expect(turnToRad(0.5)).toBeCloseTo(Math.PI);
    });
});

describe('degToGrad function', () => {
    it('should convert degrees to gradians', () => {
        expect(degToGrad(90)).toBeCloseTo(100);
    });
});

describe('gradToDeg function', () => {
    it('should convert gradians to degrees', () => {
        expect(gradToDeg(100)).toBeCloseTo(90);
    });
});

describe('convertAngle function', () => {
    it('should correctly convert between different angle units', () => {
        expect(convertAngle(90, AngleUnit.DEG, AngleUnit.RAD)).toBeCloseTo(Math.PI / 2);
        expect(convertAngle(Math.PI / 2, AngleUnit.RAD, AngleUnit.DEG)).toBeCloseTo(90);
        expect(convertAngle(0.5, AngleUnit.TURN, AngleUnit.DEG)).toBeCloseTo(180);
        expect(convertAngle(180, AngleUnit.DEG, AngleUnit.TURN)).toBeCloseTo(0.5);
        expect(convertAngle(Math.PI, AngleUnit.RAD, AngleUnit.TURN)).toBeCloseTo(0.5);
        expect(convertAngle(0.5, AngleUnit.TURN, AngleUnit.RAD)).toBeCloseTo(Math.PI);
        expect(convertAngle(90, AngleUnit.DEG, AngleUnit.GRAD)).toBeCloseTo(100);
        expect(convertAngle(100, AngleUnit.GRAD, AngleUnit.DEG)).toBeCloseTo(90);
    });

    it('should return the same value if units are the same', () => {
        expect(convertAngle(45, AngleUnit.DEG, AngleUnit.DEG)).toBe(45);
    });

    it('should return the same value if units are unknown', () => {
        expect(convertAngle(45, 'unknownUnit' as AngleUnit, 'unknownUnit' as AngleUnit)).toBe(45);
    });
});
