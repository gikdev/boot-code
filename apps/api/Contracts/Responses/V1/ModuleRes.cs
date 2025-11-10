namespace Api.Contracts.Responses.V1;

public class ModuleRes {
  public required int Id { get; init; }
  public required string Title { get; init; }
  public required string? Description { get; init; }
  public required int CourseId { get; init; }
  public required int Position { get; init; }
  public required DateTime CreatedAt { get; init; }

  public DateTime CreatedAtLocal
    => DateTime.SpecifyKind(CreatedAt, DateTimeKind.Utc).ToLocalTime();
}
