using System.ComponentModel.DataAnnotations;

namespace Api.Contracts.Requests.V1;

public class CourseReq {
  [Required(ErrorMessage = "عنوان اجباری است.")]
  [MinLength(1, ErrorMessage = "عنوان نباید خالی باشد!")]
  public required string Title { get; init; }
  public string? Description { get; init; } = null;
  [Required(ErrorMessage = "آی‌دی تامبنیل اجباری است.")]
  [Range(1, 999999999, ErrorMessage = "آی‌دی تامبنیل باید عددی مثبت باشد!")]
  public int ThumbnailId { get; init; }
}
