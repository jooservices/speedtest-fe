export function formatSpeed(bps: number, includeUnit = true): string {
  if (bps >= 1_000_000) {
    return `${(bps / 1_000_000).toFixed(2)}` + (includeUnit ? ' Mbps' : '')
  } else if (bps >= 1_000) {
    return `${(bps / 1_000).toFixed(2)}` + (includeUnit ? ' Kbps' : '')
  } else {
    return `${bps}` + (includeUnit ? ' bps' : '')
  }
}
