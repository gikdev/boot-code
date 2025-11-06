// ReSharper disable EntityFramework.ModelValidation.UnlimitedStringLength
// ReSharper disable PropertyCanBeMadeInitOnly.Global
namespace Api.Entities;

public class Curriculum {
  public int Id { get; set; }
  public string Title { get; set; } = "";
  public string? Description { get; set; }

  public ICollection<Step> Steps { get; set; } = new HashSet<Step>();
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
