const PLACEHOLDER = /\{(\w+)\}/g;

export function formatCopy(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(PLACEHOLDER, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
