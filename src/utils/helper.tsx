export function formatSpeed(bps: number): string {
  if (bps >= 1_000_000) {
    return `${(bps / 1_000_000).toFixed(2)} Mbps`
  } else if (bps >= 1_000) {
    return `${(bps / 1_000).toFixed(2)} Kbps`
  } else {
    return `${bps} bps`
  }
}
