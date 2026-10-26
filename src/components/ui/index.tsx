import * as React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={clsx(
        'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={clsx(
        'flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={clsx('block text-sm font-medium text-gray-700 mb-1', className)}
      {...props}
    />
  )
);
Label.displayName = 'Label';

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'secondary' | 'ghost' | 'destructive' }
>(({ className, variant = 'default', ...props }, ref) => {
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus:ring-gray-400',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-400',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };
  return (
    <button
      ref={ref}
      className={clsx(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        className
      )}
      {...props}
    />
  );
});
Button.displayName = 'Button';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={clsx(
        'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
);
Select.displayName = 'Select';

/**
 * Card component — semantic container for grouping content.
 */
export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsx('rounded-lg border border-gray-200 bg-white shadow-sm', className)} {...props} />
  )
);
Card.displayName = 'Card';

/**
 * Badge for status indicators.
 */
export const Badge = ({
  children,
  className,
  color = 'gray',
  capitalize,
}: {
  children: React.ReactNode;
  className?: string;
  color?: 'gray' | 'green' | 'yellow' | 'red' | 'blue';
  capitalize?: boolean;
}) => {
  const colors = {
    gray: 'bg-gray-100 text-gray-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    blue: 'bg-blue-100 text-blue-800',
  };
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        colors[color],
        capitalize && 'capitalize',
        className
      )}
    >
      {children}
    </span>
  );
};

/**
 * Spinner / loading indicator.
 */
export const Spinner = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
  </div>
);

/**
 * Error message display.
 */
export const ErrorText = ({ message }: { message: string }) => (
  <p className="mt-1 text-sm text-red-600">{message}</p>
);

/**
 * Empty state component.
 */
export const EmptyState = ({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    {description && <p className="mt-2 max-w-sm text-sm text-gray-600">{description}</p>}
    {action && <div className="mt-4">{action}</div>}
  </div>
);

/**
 * Error boundary fallback.
 */
export const ErrorBoundaryFallback = ({ error, resetError }: { error: Error; resetError: () => void }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    <h3 className="text-lg font-semibold text-gray-900">Something went wrong</h3>
    <p className="mt-2 text-sm text-gray-600">An unexpected error occurred while loading this page.</p>
    <button onClick={resetError} className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
      Try again
    </button>
  </div>
);

/**
 * Data table with optional pagination.
 */
export const Table = ({ columns, data, headers, pagination, onPageChange }: {
  columns: { key: string; label: string; render?: (row: any) => React.ReactNode; width?: string }[];
  data: any[];
  headers?: string[];
  pagination?: { page: number; limit: number; total: number; hasNext?: boolean };
  onPageChange?: (page: number) => void;
}) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-gray-200">
          {headers?.map((header, i) => (
            <th key={i} className={`px-4 py-3 font-semibold text-gray-700 ${columns[i]?.width ?? ''}`}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-b border-gray-100 align-top">
            {columns.map((col, j) => (
              <td key={j} className={`px-4 py-3 ${columns[j]?.width ?? ''}`}>
                {col.render ? col.render(row) : String(row[col.key] ?? '')}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    {pagination && (
      <div className="mt-4 flex items-center gap-2 px-4">
        <button disabled={pagination.page <= 1} onClick={() => onPageChange?.(pagination.page - 1)} className="rounded px-2 py-1 text-sm text-gray-600 disabled:opacity-50">Prev</button>
        <span className="text-sm text-gray-600">{pagination.page} of {Math.max(1, Math.ceil(pagination.total / pagination.limit))}</span>
        <button
          disabled={pagination.hasNext !== undefined ? !pagination.hasNext : pagination.page >= Math.ceil(pagination.total / pagination.limit)}
          onClick={() => onPageChange?.(pagination.page + 1)}
          className="rounded px-2 py-1 text-sm text-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    )}
  </div>
);
