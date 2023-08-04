export function compare(a, b) {
  if (a.Size_Sort < b.Size_Sort) {
    return -1;
  }
  if (a.Size_Sort > b.Size_Sort) {
    return 1;
  }
  return 0;
}
