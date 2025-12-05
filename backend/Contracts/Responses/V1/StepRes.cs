namespace Api.Contracts.Responses.V1;

public class StepRes {
  public required int Id { get; init; }
  public required int Position { get; init; }
  public required int LessonId { get; init; }
  public required int CurriculumId { get; init; }
  public required DateTime CreatedAtLocal { get; init; }
}
