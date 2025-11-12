namespace Api.Contracts.Responses.V1;

public class CourseRes {
  public required int Id { get; init; }
  public required string Title { get; init; }
  public required string? Description { get; init; }
  public required AssetRes Thumbnail { get; init; }
  public required DateTime CreatedAtLocal { get; init; }
}
