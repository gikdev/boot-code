using Api.Misc;

namespace Api.Exceptions;

public class EntityInUseException(string entity = "") : DomainException(
  $"{(string.IsNullOrEmpty(entity) ? "" : entity + " ")}در دست استفاده هست.",
  Constants.ProblemDetailsTitle.Status400BadRequest,
  StatusCodes.Status400BadRequest
);
