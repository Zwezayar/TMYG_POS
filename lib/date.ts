export function formatDateDDMMYYYY(value: Date | string | number | null | undefined) {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = String(date.getFullYear());
  return `${dd}/${mm}/${yyyy}`;
}

export function formatDateRangeDDMMYYYY(start: Date | string | number | null | undefined, end: Date | string | number | null | undefined) {
  const startText = formatDateDDMMYYYY(start);
  const endText = formatDateDDMMYYYY(end);
  if (!startText && !endText) return '';
  if (!startText) return endText;
  if (!endText) return startText;
  return `${startText} - ${endText}`;
}

export function formatTimeHHMM(value: Date | string | number | null | undefined) {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}
