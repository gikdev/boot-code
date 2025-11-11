using Api.Contracts.Responses.V1;
using Api.Entities;
using Api.Extensions;

namespace Api.Mappings;

public static class ResMappings {
  public static AssetRes MapToRes(this Asset asset) => new() {
    CreatedAtLocal = asset.CreatedAt.ToLocalTimeFromUtc(),
    Description = asset.Description,
    Id = asset.Id,
    MimeType = asset.MimeType,
    Name = asset.Name,
  };

  public static AssetsRes MapToRes(this IEnumerable<Asset> assets) => new() {
    Items = assets.Select(a => a.MapToRes()),
  };

  public static CurriculumRes MapToRes(this Curriculum curriculum) => new() {
    Id = curriculum.Id,
    Title = curriculum.Title,
    Description = curriculum.Description,
    CreatedAtLocal = curriculum.CreatedAt.ToLocalTimeFromUtc(),
  };

  public static CurriculumFullRes MapToFullRes(this Curriculum curriculum) => new() {
    Id = curriculum.Id,
    Title = curriculum.Title,
    Description = curriculum.Description,
    CreatedAtLocal = curriculum.CreatedAt.ToLocalTimeFromUtc(),
    Steps = curriculum.Steps,
  };

  public static CurriculaRes MapToRes(this IEnumerable<Curriculum> curricula) => new() {
    Items = curricula.Select(c => c.MapToRes()),
  };

  public static CourseRes MapToRes(this Course course) => new() {
    Id = course.Id,
    Title = course.Title,
    Description = course.Description,
    ThumbnailId = course.ThumbnailId,
    CreatedAtLocal = course.CreatedAt.ToLocalTimeFromUtc(),
  };

  public static CourseFullRes MapToFullRes(this Course course) => new() {
    Id = course.Id,
    Description = course.Description,
    Title = course.Title,
    ThumbnailId = course.ThumbnailId,
    Thumbnail = course.Thumbnail?.MapToRes()
                ?? throw new InvalidOperationException("Course thumbnail can't be NULL!"),
    CreatedAtLocal = course.CreatedAt.ToLocalTimeFromUtc(),
  };

  public static CoursesRes MapToRes(this IEnumerable<Course> courses) => new() {
    Items = courses.Select(c => c.MapToRes()),
  };

  public static ModuleRes MapToRes(this Module module) => new() {
    Id = module.Id,
    Title = module.Title,
    Description = module.Description,
    Position = module.Position,
    CreatedAtLocal = module.CreatedAt.ToLocalTimeFromUtc(),
    CourseId = module.CourseId,
  };

  public static ModuleFullRes MapToFullRes(this Module module) => new() {
    Id = module.Id,
    Title = module.Title,
    Description = module.Description,
    Position = module.Position,
    CreatedAtLocal = module.CreatedAt.ToLocalTimeFromUtc(),
    CourseId = module.CourseId,
    Lessons = module.Lessons.Select(l => l.MapToRes()),
  };

  public static ModulesRes MapToRes(this IEnumerable<Module> modules) => new() {
    Items = modules.Select(m => m.MapToRes()),
  };

  public static LessonRes MapToRes(this Lesson lesson) => new() {
    Id = lesson.Id,
    CreatedAtLocal = lesson.CreatedAt.ToLocalTimeFromUtc(),
    Description = lesson.Description,
    ModuleId = lesson.ModuleId,
    Position = lesson.Position,
    Title = lesson.Title,
  };

  public static LessonFullRes MapToFullRes(this Lesson lesson) => new() {
    Id = lesson.Id,
    CreatedAtLocal = lesson.CreatedAt.ToLocalTimeFromUtc(),
    Description = lesson.Description,
    ModuleId = lesson.ModuleId,
    Position = lesson.Position,
    Title = lesson.Title,
    ContentJson = lesson.ContentJson,
  };

  public static LessonsRes MapToRes(this IEnumerable<Lesson> lessons) => new() {
    Items = lessons.Select(l => l.MapToRes()),
  };
}
