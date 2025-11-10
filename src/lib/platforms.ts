export interface PlatformOption {
  label: string
  value: string
}

export const platformOptions: PlatformOption[] = [
  { label: 'Instagram', value: 'instagram' },
  { label: 'TikTok', value: 'tiktok' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Twitter', value: 'twitter' },
  { label: 'Twitch', value: 'twitch' },
  { label: 'Red', value: 'red' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'WeChat', value: 'wechat' },
  { label: 'Douyin', value: 'douyin' },
]

/**
 * Get platform label from code
 */
export function getPlatformLabel(code: string): string {
  const platform = platformOptions.find((p) => p.value === code)
  return platform?.label ?? code
}

/**
 * Get platform code from label (for backward compatibility)
 */
export function getPlatformCode(label: string): string | undefined {
  const platform = platformOptions.find((p) => p.label === label)
  return platform?.value
}

