namespace Api.Contracts.Responses.V1;

public class CurriculumRes {
  public required int Id { get; init; }
  public required string Title { get; init; }
  public required string? Description { get; init; }
  public required DateTime CreatedAt { get; init; }

  public DateTime CreatedAtLocal
    => DateTime.SpecifyKind(CreatedAt, DateTimeKind.Utc).ToLocalTime();
}
