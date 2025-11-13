namespace Api.Misc;

public static class Constants {
  public const string CookieAccessToken = "ACCESS_TOKEN";

  public static class ProblemDetailsTitle {
    public const string Status400BadRequest = "Bad Request";
    public const string Status404NotFound = "Not Found";
    public const string Status500InternalServerError = "Internal Server Error";
  }
}
