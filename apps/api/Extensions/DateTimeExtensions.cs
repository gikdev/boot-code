namespace Api.Extensions;

public static class DateTimeExtensions {
  public static DateTime ToLocalTimeFromUtc(this DateTime utcDateTime)
    => DateTime.SpecifyKind(utcDateTime, DateTimeKind.Utc).ToLocalTime();
}
