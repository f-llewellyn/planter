export function getSeason(): 'summer' | 'winter' {
  const month = new Date().getMonth();
  // Months are offset by 1 due to JS engine
  if (month >= 3 && month <= 8) {
    return 'summer';
  }
  return 'winter';
}
