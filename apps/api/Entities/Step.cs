// ReSharper disable EntityFramework.ModelValidation.UnlimitedStringLength
// ReSharper disable PropertyCanBeMadeInitOnly.Global
namespace Api.Entities;

public class Step {
  public int Id { get; set; }
  public int Position { get; set; }
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

  public int LessonId { get; set; }
  public required Lesson Lesson { get; set; }

  public int CurriculumId { get; set; }
  public required Curriculum Curriculum { get; set; }
}
