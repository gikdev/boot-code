namespace Api.Misc;

public static class ApiEndpoints {
  private const string ApiBase = "api";

  public static class V1 {
    private const string VersionBase = $"{ApiBase}/v1";

    public static class Assets {
      private const string Base = $"{VersionBase}/assets";

      public const string Upload = $"{Base}/upload";
      public const string Get = Base;
      public const string GetOne = $"{Base}/{{idOrName}}";
    }
  }
}
