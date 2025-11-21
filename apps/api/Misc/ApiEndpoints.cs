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
      public const string GetOneFile = $"{Base}/{{idOrName}}/file";
      // public const string Update = $"{Base}/{{idOrName}}";
      public const string Delete = $"{Base}/{{id:int}}";
    }

    public static class Curricula {
      private const string Base = $"{VersionBase}/curricula";

      public const string Get = Base;
      public const string Create = Base;
      public const string GetOne = $"{Base}/{{id:int}}";
      public const string Update = $"{Base}/{{id:int}}";
      public const string Delete = $"{Base}/{{id:int}}";

      public const string CreateStep = $"{Base}/{{id:int}}/steps";
      public const string GetSteps = $"{Base}/{{id:int}}/steps";
    }

    public static class Courses {
      private const string Base = $"{VersionBase}/courses";

      public const string Get = Base;
      public const string Create = Base;
      public const string GetOne = $"{Base}/{{id:int}}";
      public const string Update = $"{Base}/{{id:int}}";
      public const string Delete = $"{Base}/{{id:int}}";

      public const string CreateModule = $"{Base}/{{id:int}}/modules";
      public const string GetModules = $"{Base}/{{id:int}}/modules";
    }

    public static class Modules {
      private const string Base = $"{VersionBase}/modules";

      public const string UpdatePositions = $"{Base}";
      public const string GetOne = $"{Base}/{{id:int}}";
      public const string Update = $"{Base}/{{id:int}}";
      public const string Delete = $"{Base}/{{id:int}}";

      public const string CreateLesson = $"{Base}/{{id:int}}/lessons";
      public const string GetLessons = $"{Base}/{{id:int}}/lessons";
    }

    public static class Lessons {
      private const string Base = $"{VersionBase}/lessons";

      public const string GetOne = $"{Base}/{{id:int}}";
      public const string UpdateContent = $"{Base}/{{id:int}}";
      public const string Update = $"{Base}/{{id:int}}";
      public const string Delete = $"{Base}/{{id:int}}";
    }

    public static class Steps {
      private const string Base = $"{VersionBase}/steps";

      public const string UpdatePosition = $"{Base}/{{id:int}}/position";
      public const string Delete = $"{Base}/{{id:int}}";
    }
  }
}
