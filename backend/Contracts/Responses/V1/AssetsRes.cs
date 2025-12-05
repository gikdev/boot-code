namespace Api.Contracts.Responses.V1;

public class AssetsRes {
  public required IEnumerable<AssetRes> Items { get; init; }
}
