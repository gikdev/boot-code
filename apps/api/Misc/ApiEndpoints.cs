namespace Api.Misc;

public static class ApiEndpoints {
  private const string ApiBase = "api";

  public static class V1 {
    private const string VersionBase = $"{ApiBase}/v1";

    public static class Assets {
      private const string Base = $"{VersionBase}/assets";

      public const string Create = Base;
      public const string Get = Base;
      public const string GetOne = $"{Base}/{{idOrName}}";
      // public const string Update = $"{Base}/{{idOrName}}";
      public const string Delete = $"{Base}/{{idOrName}}";
    }

    public static class Curricula {
      private const string Base = $"{VersionBase}/curricula";

      public const string Get = Base;
      public const string Create = Base;
      public const string GetOne = $"{Base}/{{id:int}}";
      public const string Update = $"{Base}/{{id:int}}";
      public const string Delete = $"{Base}/{{id:int}}";
    }

    public static class Courses {
      private const string Base = $"{VersionBase}/courses";

      public const string Get = Base;
      public const string Create = Base;
      public const string GetOne = $"{Base}/{{id:int}}";
      public const string Update = $"{Base}/{{id:int}}";
      public const string Delete = $"{Base}/{{id:int}}";
    }
  }
}
