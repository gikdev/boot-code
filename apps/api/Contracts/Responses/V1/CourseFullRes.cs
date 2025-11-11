namespace Api.Contracts.Responses.V1;

public class CourseFullRes : CourseRes {
  public required AssetRes Thumbnail { get; init; }
}
