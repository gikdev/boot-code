// ReSharper disable EntityFramework.ModelValidation.UnlimitedStringLength
// ReSharper disable PropertyCanBeMadeInitOnly.Global
namespace Api.Entities;

public class Course {
  public int Id { get; set; }
  public string Title { get; set; } = "";
  public string? Description { get; set; }

  public int ThumbnailId { get; set; }
  public required Asset Thumbnail { get; set; }

  public ICollection<Module> Modules { get; set; } = new HashSet<Module>();
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
