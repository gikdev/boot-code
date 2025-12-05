namespace Api.Contracts.Responses.V1;

public class LessonFullRes : LessonRes {
  public required string? ContentJson { get; init; }
}
