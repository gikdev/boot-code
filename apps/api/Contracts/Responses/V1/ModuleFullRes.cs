namespace Api.Contracts.Responses.V1;

public class ModuleFullRes : ModuleRes {
  public required IEnumerable<LessonRes> Lessons { get; init; }
}
