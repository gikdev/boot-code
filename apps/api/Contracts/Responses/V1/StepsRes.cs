namespace Api.Contracts.Responses.V1;

public class StepsRes {
  public required IEnumerable<StepRes> Items { get; init; }
}
