
// Grinder conversion data
const GRINDER_DATA = {
  c3esp: {
    range: { min: 0, max: 90 },
    calibration: [
      { clicks: 36, microns: 400 },
      { clicks: 54, microns: 600 }
    ]
  },
  zp6: {
    range: { min: 0, max: 130 },
    calibration: [
      { clicks: 31, microns: 600 },
      { clicks: 55, microns: 800 }
    ]
  }
};

// Linear interpolation function
const linearInterpolation = (x: number, x0: number, y0: number, x1: number, y1: number): number => {
  const slope = (y1 - y0) / (x1 - x0);
  return y0 + slope * (x - x0);
};

// Convert from C3 ESP clicks to microns
export const c3espToMicrons = (clicks: number): number => {
  const { calibration } = GRINDER_DATA.c3esp;
  return linearInterpolation(
    clicks,
    calibration[0].clicks,
    calibration[0].microns,
    calibration[1].clicks,
    calibration[1].microns
  );
};

// Convert from ZP6 clicks to microns
export const zp6ToMicrons = (clicks: number): number => {
  const { calibration } = GRINDER_DATA.zp6;
  return linearInterpolation(
    clicks,
    calibration[0].clicks,
    calibration[0].microns,
    calibration[1].clicks,
    calibration[1].microns
  );
};

// Convert from microns to C3 ESP clicks
export const micronsToC3esp = (microns: number): number => {
  const { calibration } = GRINDER_DATA.c3esp;
  return linearInterpolation(
    microns,
    calibration[0].microns,
    calibration[0].clicks,
    calibration[1].microns,
    calibration[1].clicks
  );
};

// Convert from microns to ZP6 clicks
export const micronsToZp6 = (microns: number): number => {
  const { calibration } = GRINDER_DATA.zp6;
  return linearInterpolation(
    microns,
    calibration[0].microns,
    calibration[0].clicks,
    calibration[1].microns,
    calibration[1].clicks
  );
};

// Range validation helpers
export const validateC3espClicks = (clicks: number): number => {
  const { min, max } = GRINDER_DATA.c3esp.range;
  return Math.max(min, Math.min(clicks, max));
};

export const validateZp6Clicks = (clicks: number): number => {
  const { min, max } = GRINDER_DATA.zp6.range;
  return Math.max(min, Math.min(clicks, max));
};

export const validateMicrons = (microns: number): number => {
  // Based on our calibration data, reasonable coffee grinding range
  const min = 200;
  const max = 1200;
  return Math.max(min, Math.min(microns, max));
};

// Get range data for UI display
export const getGrinderRanges = () => {
  return {
    c3esp: GRINDER_DATA.c3esp.range,
    zp6: GRINDER_DATA.zp6.range
  };
};

// Format numbers to have at most 1 decimal place
export const formatNumber = (num: number): string => {
  return Number(num.toFixed(1)).toString();
};
