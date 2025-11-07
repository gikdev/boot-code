using System.ComponentModel;

namespace Api.Contracts.Responses.V1;

public class AssetRes {
  public required int Id { get; init; }

  public required string Name { get; init; }

  public required string? Description { get; init; }

  [Description("")]
  public required string MimeType { get; init; }

  [Description("")]
  public required DateTime CreatedAt { get; init; }
}
