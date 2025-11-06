// ReSharper disable EntityFramework.ModelValidation.UnlimitedStringLength
// ReSharper disable PropertyCanBeMadeInitOnly.Global
namespace Api.Entities;

public class Asset {
  public int Id { get; set; }

  public string Name { get; set; } = "";
  public string? Description { get; set; }
  public string MimeType { get; set; } = "text/plain";

  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
