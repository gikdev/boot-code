using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace Api.Exceptions;

public class GlobalExceptionHandler : IExceptionHandler {
  public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken) {
    var problemDetails = new ProblemDetails {
      Instance = httpContext.Request.Path,
    };

    if (exception is DomainException ex) {
      httpContext.Response.StatusCode = ex.StatusCode;
      problemDetails.Title = ex.Title;
      problemDetails.Detail = ex.Message;
    }
    else {
      problemDetails.Title = exception.Message;
    }

    problemDetails.Status = httpContext.Response.StatusCode;

    await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken).ConfigureAwait(false);

    return true;
  }
}
