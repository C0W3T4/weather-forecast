export function removeDecimals(decimalNumber: number | undefined = 0): string {
  if (typeof decimalNumber !== 'number') {
    return '';
  }

  return decimalNumber.toFixed(0);
}
