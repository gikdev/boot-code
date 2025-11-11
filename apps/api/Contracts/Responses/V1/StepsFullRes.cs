namespace Api.Contracts.Responses.V1;

public class StepsFullRes {
  public required IEnumerable<StepRes> Items { get; init; }
}
