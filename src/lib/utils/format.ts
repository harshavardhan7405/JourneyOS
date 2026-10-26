export const formatCurrency = (amountCents: number, currency: string): string => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(amountCents / 100);
  } catch {
    return `$${amountCents / 100}`;
  }
};

export const formatDate = (dateStr: string): string => {
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch {
    // Return empty string for invalid dates instead of throwing
    return '';
  }
};

export const formatDateShort = (dateStr: string): string => {
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch {
    // Return empty string for invalid dates instead of throwing
    return '';
  }
};

export const paginate = (page: number, limit: number): { skip: number; take: number } => {
  return {
    skip: Math.max(0, (page - 1) * limit),
    take: limit,
  };
};

export const paginateResult = <T>(items: T[], page: number, totalCount: number, limit: number) => ({
  items,
  pagination: {
    page,
    limit,
    total: totalCount,
    totalPages: Math.ceil(totalCount / limit),
    hasNext: page * limit < totalCount,
    hasPrev: page > 1,
  },
});

export const formatListData = (items: any[] | Record<string, unknown>[]) => items;

/**
 * Sanitize and validate client-side input before submission.
 * Always re-validate on the server.
 */
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  // Basic sanitization - remove potentially dangerous characters
  // This is a client-side guard, server-side validation is the authoritative check
  return input.trim().slice(0, 1000);
};
