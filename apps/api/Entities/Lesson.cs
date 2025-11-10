// ReSharper disable EntityFramework.ModelValidation.UnlimitedStringLength
// ReSharper disable PropertyCanBeMadeInitOnly.Global
namespace Api.Entities;

public class Lesson {
  public int Id { get; set; }
  public string Title { get; set; } = "";
  public string? Description { get; set; }
  public string? ContentJson { get; set; }
  public int Position { get; set; }
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

  public int ModuleId { get; set; }
  public Module? Module { get; set; }

  public ICollection<Step> Steps { get; set; } = new HashSet<Step>();
}
