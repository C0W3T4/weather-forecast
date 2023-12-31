export function capitalize(str?: string): string {
  if (typeof str !== 'string') {
    return ''
  }

  return str.charAt(0).toUpperCase() + str.substring(1)
}
