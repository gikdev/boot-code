// ReSharper disable EntityFramework.ModelValidation.UnlimitedStringLength
// ReSharper disable PropertyCanBeMadeInitOnly.Global
namespace Api.Entities;

public class Lesson {
  public int Id { get; set; }
  public string Title { get; set; } = "";
  public string? Description { get; set; }
  public int Position { get; set; }

  // optional assets
  public int? ImageId { get; set; }
  public Asset? Image { get; set; }

  public int? VideoId { get; set; }
  public Asset? Video { get; set; }

  public int? TextId { get; set; }
  public Asset? Text { get; set; }

  public int? AudioId { get; set; }
  public Asset? Audio { get; set; }

  public int? FileId { get; set; }
  public Asset? File { get; set; }

  public int ModuleId { get; set; }
  public required Module Module { get; set; }

  public ICollection<Step> Steps { get; set; } = new HashSet<Step>();
}
