export const canUseDOM = typeof window !== 'undefined';

export const hasWebGL = !!window.WebGLRenderingContext;

export const supportsVibrationAPI = 'vibrate' in window.navigator;
