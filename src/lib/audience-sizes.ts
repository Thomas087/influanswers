export interface AudienceSizeOption {
  label: string
  value: string
}

export const audienceSizeOptions: AudienceSizeOption[] = [
  { label: 'KOC (0-1k)', value: 'koc' },
  { label: 'Nano (1k – 10k)', value: 'nano' },
  { label: 'Micro (10k – 50k)', value: 'micro' },
  { label: 'Mid-tier (50k – 100k)', value: 'mid-tier' },
]

/**
 * Get audience size label from code
 */
export function getAudienceSizeLabel(code: string): string {
  const size = audienceSizeOptions.find((s) => s.value === code)
  return size?.label ?? code
}

/**
 * Get audience size code from label (for backward compatibility)
 */
export function getAudienceSizeCode(label: string): string | undefined {
  const size = audienceSizeOptions.find((s) => s.label === label)
  return size?.value
}

