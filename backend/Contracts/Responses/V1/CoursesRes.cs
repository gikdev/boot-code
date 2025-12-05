namespace Api.Contracts.Responses.V1;

public class CoursesRes {
  public required IEnumerable<CourseRes> Items { get; init; }
}
