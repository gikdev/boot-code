using Scalar.AspNetCore;

namespace Api.Extensions;

public static class WebAppExtensions {
  public static WebApplication MapApiDocs(this WebApplication app) {
    app.MapOpenApi();
    app.MapScalarApiReference("/docs/scalar", o => {
      o.WithTitle("Boot Code API");
      o.Layout = ScalarLayout.Classic;
      o.Theme = ScalarTheme.DeepSpace;
    });

    return app;
  }

  public static WebApplication UseDevCorsInDevEnv(this WebApplication app) {
    if (app.Environment.IsDevelopment()) {
      app.UseCors("DevCorsPolicy");
    }

    return app;
  }

  public static WebApplication UseHostStaticFiles(this WebApplication app) {
    app.UseDefaultFiles();
    app.UseStaticFiles();
    app.MapFallbackToFile("index.html");

    return app;
  }

  public static WebApplication UseGlobalExceptionHandler(this WebApplication app) {
    app.UseExceptionHandler();

    return app;
  }
}
