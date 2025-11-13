using System.ComponentModel.DataAnnotations;

namespace Api.Contracts.Requests.V1;

public class AssetReq {
  [Required]
  public required IFormFile File { get; set; }

  public string? Description { get; set; } = null;
}
