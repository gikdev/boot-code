namespace Api.Exceptions;

public abstract class DomainException(
  string message,
  string title,
  int statusCode = StatusCodes.Status500InternalServerError
) : Exception(message) {
  public int StatusCode = statusCode;
  public string Title = title;
}
