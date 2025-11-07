namespace Api.Exceptions;

public class NotFoundException(string entity = "") : DomainException(
  $"{(string.IsNullOrEmpty(entity) ? "" : entity + " ")}پیدا نشد!"
);
