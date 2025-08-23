import { unitType } from "routes/HomePage";

export function formatSpeed(Bps: number, includeUnit = true, convertTo: unitType = 'Mbps', isReadable = true): string {
  let convertedSpeed: string|number = Bps;

  switch (convertTo) {
    case 'bps': // bits per second
      convertedSpeed = Bps * 8
      break
    case 'Kbps': // kilobits per second
      convertedSpeed = (Bps * 8) / 1_000
      break;
    case 'Mbps': // megabits per second
      convertedSpeed = (Bps * 8) / 1_000_000
      break;
    case 'Gbps': // gigabits per second
      convertedSpeed = (Bps * 8) / 1_000_000_000
      break;
    case 'Bps': // bytes per second
      convertedSpeed = Bps
      break;
    case 'KBps': // kilobytes per second
      convertedSpeed = Bps / 1_000
      break;
    case 'MBps': // megabytes per second
      convertedSpeed = Bps / 1_000_000
      break;
    case 'GBps': // gigabytes per second
      convertedSpeed = Bps / 1_000_000_000
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
