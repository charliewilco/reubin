export class Assertions {
  static undefined(value: any): value is undefined {
    return typeof value === "undefined";
  }

  static string(value: any): value is string {
    return typeof value === "string";
  }

  static null(value: any): value is null {
    return value === null;
  }
}
