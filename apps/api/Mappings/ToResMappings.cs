using Api.Contracts.Responses.V1;
using Api.Entities;

namespace Api.Mappings;

public static class ResMappings {
  public static AssetRes MapToRes(this Asset asset) => new() {
    CreatedAt = asset.CreatedAt,
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
    CreatedAt = curriculum.CreatedAt,
  };

  public static CurriculaRes MapToRes(this IEnumerable<Curriculum> curricula) => new() {
    Items = curricula.Select(c => c.MapToRes()),
  };

  public static NewCourseRes MapToNewCourseRes(this Course course) => new() {
    Id = course.Id,
    Title = course.Title,
    Description = course.Description,
    ThumbnailId = course.ThumbnailId,
    CreatedAt = course.CreatedAt,
  };

  public static CourseRes MapToRes(this Course course) => new() {
    Id = course.Id,
    Description = course.Description,
    Title = course.Title,
    Thumbnail = course.Thumbnail?.MapToRes()
                ?? throw new InvalidOperationException("Course thumbnail can't be NULL!"),
    CreatedAt = course.CreatedAt,
  };

  public static CoursesRes MapToRes(this IEnumerable<Course> courses) => new() {
    Items = courses.Select(c => c.MapToRes()),
  };

  public static ModuleRes MapToRes(this Module module) => new() {
    Id = module.Id,
    Title = module.Title,
    Description = module.Description,
    Position = module.Position,
    CreatedAt = module.CreatedAt,
    CourseId = module.CourseId,
  };

  public static ModuleFullRes MapToFullRes(this Module module) => new() {
    Id = module.Id,
    Title = module.Title,
    Description = module.Description,
    Position = module.Position,
    CreatedAt = module.CreatedAt,
    CourseId = module.CourseId,
    // TODO: Map these to their response...
    Lessons = module.Lessons
  };

  public static ModulesRes MapToRes(this IEnumerable<Module> modules) => new() {
    Items = modules.Select(m => m.MapToRes()),
  };

  public static LessonRes MapToRes(this Lesson lesson) => new() {
    Id = lesson.Id,
    CreatedAt = lesson.CreatedAt,
    Description = lesson.Description,
    ModuleId = lesson.ModuleId,
    Position = lesson.Position,
    Title = lesson.Title,
  };

  public static LessonFullRes MapToFullRes(this Lesson lesson) => new() {
    Id = lesson.Id,
    CreatedAt = lesson.CreatedAt,
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
