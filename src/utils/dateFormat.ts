import { format } from 'date-fns';

/**
 * Safely formats a date value, handling Firestore Timestamps, null/undefined, and invalid dates
 * @param dateValue - The date value (can be string, Date, Firestore Timestamp, null, or undefined)
 * @param formatString - The date format string (default: 'MMM d, yyyy')
 * @param fallback - The fallback text to show if date is invalid (default: 'Date unavailable')
 * @returns Formatted date string or fallback text
 */
export function safeFormatDate(
  dateValue: any,
  formatString: string = 'MMM d, yyyy',
  fallback: string = 'Date unavailable'
): string {
  if (!dateValue) {
    return fallback;
  }

  try {
    let date: Date;

    // Handle Firestore Timestamp objects
    if (typeof dateValue === 'object' && dateValue !== null && 'toDate' in dateValue) {
      date = dateValue.toDate();
    } else if (typeof dateValue === 'string') {
      date = new Date(dateValue);
    } else if (dateValue instanceof Date) {
      date = dateValue;
    } else {
      date = new Date(dateValue);
    }

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return fallback;
    }

    return format(date, formatString);
  } catch (error) {
    console.warn('Error formatting date:', error, dateValue);
    return fallback;
  }
}

