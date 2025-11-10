namespace Api.Contracts.Responses.V1;

public class NewCourseRes {
  public required int Id { get; init; }
  public required string Title { get; init; }
  public required string? Description { get; init; }
  public required int ThumbnailId { get; init; }
}
