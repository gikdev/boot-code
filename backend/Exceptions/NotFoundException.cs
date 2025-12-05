using Api.Misc;

namespace Api.Exceptions;

public class NotFoundException(string entity = "") : DomainException(
  $"{(string.IsNullOrEmpty(entity) ? "" : entity + " ")}پیدا نشد!",
  Constants.ProblemDetailsTitle.Status404NotFound,
  StatusCodes.Status404NotFound
);
