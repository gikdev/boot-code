namespace Api.Contracts.Responses.V1;

public class CurriculumFullRes : CurriculumRes {
  public required IEnumerable<object> Steps { get; init; }
}
