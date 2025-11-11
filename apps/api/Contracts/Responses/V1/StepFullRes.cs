namespace Api.Contracts.Responses.V1;

public class StepFullRes : StepRes {
  public required LessonRes Lesson { get; init; }
}
