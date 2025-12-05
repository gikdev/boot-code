using System.ComponentModel.DataAnnotations;

namespace Api.Contracts.Requests.V1;

public class CurriculumReq {
  [Required(ErrorMessage = "عنوان اجباری است.")]
  [MinLength(1, ErrorMessage = "عنوان نباید خالی باشد!")]
  public required string Title { get; init; }
  public string? Description { get; init; } = null;
}
