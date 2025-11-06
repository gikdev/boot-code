// ReSharper disable EntityFramework.ModelValidation.UnlimitedStringLength
// ReSharper disable PropertyCanBeMadeInitOnly.Global
namespace Api.Entities;

public class Module {
  public int Id { get; set; }
  public string Title { get; set; } = "";
  public string? Description { get; set; }

  public int CourseId { get; set; }
  public required Course Course { get; set; }

  public int Position { get; set; }

  public ICollection<Lesson> Lessons { get; set; } = new HashSet<Lesson>();
}
