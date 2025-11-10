using Api.Contracts.Requests.V1;
using Api.Entities;

namespace Api.Mappings;

public static class FromReqMappings {
  public static Curriculum ToEntity(this CurriculumReq req) => new() {
    Title = req.Title,
    Description = req.Description,
  };

  public static Course ToEntity(this CourseReq req) => new() {
    Title = req.Title,
    Description = req.Description,
    ThumbnailId = req.ThumbnailId,
  };
}
