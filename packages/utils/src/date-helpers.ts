export class DateHelpers {
  public static toInteger(dirtyNumber: unknown) {
    if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
      return NaN;
    }

    const number = Number(dirtyNumber);

    if (isNaN(number)) {
      return number;
    }

    return number < 0 ? Math.ceil(number) : Math.floor(number);
  }

  public static toDate(argument: Date | number): Date {
    const argStr = Object.prototype.toString.call(argument);

    // Clone the date
    if (
      argument instanceof Date ||
      (typeof argument === "object" && argStr === "[object Date]")
    ) {
      // Prevent the date to lose the milliseconds when passed to new Date() in IE10
      return new Date(argument.getTime());
    } else if (typeof argument === "number" || argStr === "[object Number]") {
      return new Date(argument);
    } else {
      if (
        (typeof argument === "string" || argStr === "[object String]") &&
        typeof console !== "undefined"
      ) {
        // eslint-disable-next-line no-console
        console.warn(new Error().stack);
      }
      return new Date(NaN);
    }
  }

  public static fromUnixTimestamp(unix: number) {
    return new Date(unix * 1000);
  }

  public static subtractMonth(dirtyDate: Date | number, dirtyAmount: number): Date {
    const amount = this.toInteger(dirtyAmount);
    return this.addMonths(dirtyDate, -amount);
  }

  public static addMonths(dirtyDate: Date | number, dirtyAmount: number) {
    const date = this.toDate(dirtyDate);
    const amount = this.toInteger(dirtyAmount);
    if (isNaN(amount)) {
      return new Date(NaN);
    }
    if (!amount) {
      // If 0 months, no-op to avoid changing times in the hour before end of DST
      return date;
    }
    const dayOfMonth = date.getDate();

    // The JS Date object supports date math by accepting out-of-bounds values for
    // month, day, etc. For example, new Date(2020, 0, 0) returns 31 Dec 2019 and
    // new Date(2020, 13, 1) returns 1 Feb 2021.  This is *almost* the behavior we
    // want except that dates will wrap around the end of a month, meaning that
    // new Date(2020, 13, 31) will return 3 Mar 2021 not 28 Feb 2021 as desired. So
    // we'll default to the end of the desired month by adding 1 to the desired
    // month and using a date of 0 to back up one day to the end of the desired
    // month.
    const endOfDesiredMonth = new Date(date.getTime());
    endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
    const daysInMonth = endOfDesiredMonth.getDate();
    if (dayOfMonth >= daysInMonth) {
      // If we're already at the end of the month, then this is the correct date
      // and we're done.
      return endOfDesiredMonth;
    } else {
      // Otherwise, we now know that setting the original day-of-month value won't
      // cause an overflow, so set the desired day-of-month. Note that we can't
      // just set the date of `endOfDesiredMonth` because that object may have had
      // its time changed in the unusual case where where a DST transition was on
      // the last day of the month and its local time was in the hour skipped or
      // repeated next to a DST transition.  So we use `date` instead which is
      // guaranteed to still have the original time.
      date.setFullYear(
        endOfDesiredMonth.getFullYear(),
        endOfDesiredMonth.getMonth(),
        dayOfMonth
      );
      return date;
    }
  }
}
