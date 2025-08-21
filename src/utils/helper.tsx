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

export function formatPing(ping: number, includeUnit = true, isReadable = true): string {
  if (isReadable) {
    ping.toLocaleString(undefined, { maximumFractionDigits: 2 })
  }

  return ping + (includeUnit ? ' ms' : '');
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
