using Api.Contracts.Requests.V1;
using Api.DTOs;
using Api.Entities;

namespace Api.Mappings;

public static class FromReqMappings {
  public static Curriculum MapToEntity(this CurriculumReq req) => new() {
    Title = req.Title,
    Description = req.Description,
  };

  public static Course MapToEntity(this CourseReq req) => new() {
    Title = req.Title,
    Description = req.Description,
    ThumbnailId = req.ThumbnailId,
  };

  public static Module MapToEntity(this ModuleReq req) => new() {
    Title = req.Title,
    Description = req.Description,
    Position = req.Position,
    CourseId = req.CourseId,
  };

  public static Lesson MapToEntity(this LessonReq req) => new() {
    Title = req.Title,
    Description = req.Description,
    Position = req.Position,
    ModuleId = req.ModuleId,
  };

  public static LessonContentDto MapToDto(this LessonContentReq req) => new() {
    ContentJson = req.ContentJson,
  };

  public static Step MapToEntity(this StepReq req) => new() {
    Position = req.Position,
    LessonId = req.LessonId,
    CurriculumId = req.CurriculumId,
  };
}
