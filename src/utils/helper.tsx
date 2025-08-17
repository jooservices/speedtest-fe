export function formatSpeed(bps: number, includeUnit = true, convertTo: string = 'mbps'): string {
  let speedInMbps = bps / 125_000;

  switch (convertTo) {
    case 'bps':
      return `${bps}` + (includeUnit ? ' bps' : '');
    case 'kbps':
      return `${(speedInMbps * 1_000).toFixed(2)}` + (includeUnit ? ' Kbps' : '');
    case 'gbps':
      return `${(speedInMbps / 1_000).toFixed(2)}` + (includeUnit ? ' Gbps' : '');
    default:
      return `${(speedInMbps).toFixed(2)}` + (includeUnit ? ' Mbps' : '');
  }
}

export function formatPing(pingInMb: number, includeUnit = true, convertTo: string = 'mb'): string {

  switch (convertTo) {
    case 'bps':
      return `${pingInMb * 1_000_000}` + (includeUnit ? ' bps' : '');
    case 'kbps':
      return `${(pingInMb * 1_000).toFixed(2)}` + (includeUnit ? ' Kbps' : '');
    case 'gbps':
      return `${(pingInMb / 1_000).toFixed(2)}` + (includeUnit ? ' Gbps' : '');
    default:
      return `${(pingInMb).toFixed(2)}` + (includeUnit ? ' Mbps' : '');
  }
}
