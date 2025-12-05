namespace Api.Contracts.Responses.V1;

public class ModulesRes {
  public required IEnumerable<ModuleRes> Items { get; init; }
}
