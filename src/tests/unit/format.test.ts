import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDateShort, paginate, paginateResult, sanitizeInput } from '@/lib/utils/format';

describe('formatCurrency', () => {
  it('should format USD amounts correctly', () => {
    expect(formatCurrency(480000, 'USD')).toBe('$4,800.00');
    expect(formatCurrency(360000, 'EUR')).toBe('€3,600.00');
    expect(formatCurrency(12345, 'USD')).toBe('$123.45');
  });

  it('should handle zero', () => {
    expect(formatCurrency(0, 'USD')).toBe('$0.00');
  });

  it('should fall back for invalid currency codes', () => {
    const result = formatCurrency(10000, 'XYZ');
    expect(result).toContain('100');
  });
});

describe('formatDateShort', () => {
  it('should format dates in US English locale', () => {
    const result = formatDateShort('2025-06-01T00:00:00.000Z');
    expect(result).toContain('2025');
    // Check that it contains a month abbreviation pattern (not empty)
    expect(result.split(',')[0]).toMatch(/^[A-Za-z]+/);
  });

  it('should handle invalid date strings gracefully', () => {
    expect(() => formatDateShort('not-a-date')).not.toThrow();
    expect(() => formatDateShort('')).not.toThrow();
  });
});

describe('paginate', () => {
  it('should calculate skip and take correctly for page 1', () => {
    const result = paginate(1, 20);
    expect(result.skip).toBe(0);
    expect(result.take).toBe(20);
  });

  it('should calculate skip and take correctly for page 3', () => {
    const result = paginate(3, 20);
    expect(result.skip).toBe(40);
    expect(result.take).toBe(20);
  });

  it('should handle page 0 as valid skip of 0', () => {
    const result = paginate(0, 20);
    expect(result.skip).toBe(0);
  });
});

describe('paginateResult', () => {
  it('should calculate total pages correctly', () => {
    const result = paginateResult([1, 2], 1, 50, 10);
    expect(result.pagination.totalPages).toBe(5);
    expect(result.pagination.hasNext).toBe(true);
    expect(result.pagination.hasPrev).toBe(false);
  });

  it('should indicate no previous page on first page', () => {
    const result = paginateResult([1], 1, 10, 5);
    expect(result.pagination.hasPrev).toBe(false);
  });

  it('should indicate no next page on last page', () => {
    const result = paginateResult([], 2, 10, 5);
    expect(result.pagination.hasNext).toBe(false);
  });
});

describe('sanitizeInput', () => {
  it('should trim whitespace', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello');
  });

  it('should truncate long inputs', () => {
    expect(sanitizeInput('a'.repeat(1001))).toHaveLength(1000);
  });

  it('should return empty string for non-string input', () => {
    expect(sanitizeInput(null as any)).toBe('');
    expect(sanitizeInput(undefined as any)).toBe('');
    expect(sanitizeInput(123 as any)).toBe('');
  });
});
