using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Api.Contracts.Requests.V1;

public class AssetReq {
  [Required]
  public required IFormFile File { get; set; }

  [DataType(DataType.Text)]
  [Description("SHOULD BE STRING or NULL!")]
  public string? Description { get; set; } = null;
}
