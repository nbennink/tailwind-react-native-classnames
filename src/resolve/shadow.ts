import { error, StyleIR } from '../types';
import { parseUnconfigged } from './helpers';

export function shadowOpacity(value: string): StyleIR {
  const percentage = parseInt(value, 10);
  if (Number.isNaN(percentage)) {
    return { kind: `null` };
  }

  return {
    kind: `complete`,
    style: { shadowOpacity: percentage / 100 },
  };
}

export function shadowOffset(value: string): StyleIR {
  if (value.includes(`/`)) {
    const [widthStr = ``, heightStr = ``] = value.split(`/`, 2);
    const width = offsetValue(widthStr);
    const height = offsetValue(heightStr);
    if (width === null || height === null) {
      return error(`invalid utility: shadow-offset-${value}`);
    }
    return {
      kind: `complete`,
      style: {
        shadowOffset: {
          width,
          height,
        },
      },
    };
  }

  const number = offsetValue(value);
  if (number === null) {
    return error(`invalid utility: shadow-offset-${value}`);
  }

  return {
    kind: `complete`,
    style: {
      shadowOffset: {
        width: number,
        height: number,
      },
    },
  };
}

function offsetValue(value: string): number | null {
  const parsed = parseUnconfigged(value);
  return typeof parsed === `number` ? parsed : null;
}
