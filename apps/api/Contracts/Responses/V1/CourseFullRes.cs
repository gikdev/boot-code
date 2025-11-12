namespace Api.Contracts.Responses.V1;

public class CourseFullRes : CourseRes {
  public required IEnumerable<ModuleRes> Modules { get; init; }
}
