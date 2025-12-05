namespace Api.Contracts.Responses.V1;

public class AssetRes {
  public required int Id { get; init; }
  public required string Name { get; init; }
  public required string? Description { get; init; }
  public required string MimeType { get; init; }
  public required DateTime CreatedAtLocal { get; init; }
}
