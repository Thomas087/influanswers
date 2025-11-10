export interface GenderOption {
  label: string
  value: string
}

export const genderOptions: GenderOption[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
]

/**
 * Get gender label from code
 */
export function getGenderLabel(code: string): string {
  const gender = genderOptions.find((g) => g.value === code)
  return gender?.label ?? code
}

/**
 * Get gender code from label (for backward compatibility)
 */
export function getGenderCode(label: string): string | undefined {
  const gender = genderOptions.find((g) => g.label === label)
  return gender?.value
}

