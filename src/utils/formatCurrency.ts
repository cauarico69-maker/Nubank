/**
 * Formats a monetary amount into Brazilian Real standard (e.g. 1.000,00 or 50.731,22)
 * Supports custom string overrides if the user explicitly typed dots and commas.
 */
const brlFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatBRL(amount: number, customDisplay?: string): string {
  if (customDisplay && customDisplay.trim()) {
    const trimmed = customDisplay.trim().replace(/^R\$\s*/i, '');
    return trimmed;
  }
  return brlFormatter.format(amount || 0);
}

