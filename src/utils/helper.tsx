import { unitType } from "routes/HomePage";

export function formatSpeed(bps: number, includeUnit = true, convertTo: unitType = 'Mbps', isReadable = true): string {
  let speedInMbps = bps / 125_000;
  let convertedSpeed: string|number = speedInMbps;

  switch (convertTo) {
    case 'bps':
      convertedSpeed = bps
      break
    case 'Kbps':
      convertedSpeed =  speedInMbps * 1_000
      break;
    case 'Gbps':
      convertedSpeed = speedInMbps / 1_000
      break;
  }

  if (isReadable) {
    convertedSpeed = convertedSpeed.toLocaleString(undefined, { maximumFractionDigits: 2 })
  }

  return convertedSpeed + (includeUnit ? ' ' + convertTo : '')
}

export function formatPing(pingInMb: number, includeUnit = true, convertTo: unitType = 'Mbps', isReadable = true): string {
  let pingInMbps = pingInMb;
  let convertedSpeed: string|number = pingInMbps;

  switch (convertTo) {
    case 'bps':
      convertedSpeed = pingInMbps * 1_000_000
      break;
    case 'Kbps':
      convertedSpeed = pingInMbps * 1_000
      break;
    case 'Gbps':
      convertedSpeed = pingInMbps / 1_000
      break;
  }

  if (isReadable) {
    convertedSpeed = convertedSpeed.toLocaleString(undefined, { maximumFractionDigits: 2 })
  }

  return convertedSpeed + (includeUnit ? ' ' + convertTo : '');
}

export function buildSearchParams(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}
