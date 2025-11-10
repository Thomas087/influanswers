export interface ContentFormatOption {
  label: string
  value: string
}

export const contentFormatOptions: ContentFormatOption[] = [
  { label: 'Video', value: 'video' },
  { label: 'Reels', value: 'reels' },
  { label: 'Photos', value: 'photos' },
  { label: 'Live streams', value: 'live-streams' },
  { label: 'Blog', value: 'blog' },
  { label: 'Podcast', value: 'podcast' },
]

/**
 * Get content format label from code
 */
export function getContentFormatLabel(code: string): string {
  const format = contentFormatOptions.find((f) => f.value === code)
  return format?.label ?? code
}

/**
 * Get content format code from label (for backward compatibility)
 */
export function getContentFormatCode(label: string): string | undefined {
  const format = contentFormatOptions.find((f) => f.label === label)
  return format?.value
}

