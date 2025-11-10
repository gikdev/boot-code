using Api.Misc;

namespace Api.Exceptions;

public class NotFoundException(string entity = "") : DomainException(
  $"{(string.IsNullOrEmpty(entity) ? "" : entity + " ")}پیدا نشد!",
  Constants.ProblemDetailsTitle.NotFound,
  StatusCodes.Status404NotFound
);
