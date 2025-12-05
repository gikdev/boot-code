namespace Api.Contracts.Responses.V1;

public class LessonsRes {
  public required IEnumerable<LessonRes> Items { get; init; }
}
