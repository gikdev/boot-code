using System.ComponentModel.DataAnnotations;

namespace Api.Contracts.Requests.V1;

public class ModuleReq {
  [Required(ErrorMessage = "عنوان اجباری است.")]
  [MinLength(1, ErrorMessage = "عنوان نباید خالی باشد!")]
  public required string Title { get; init; }
  public string? Description { get; init; }

  [Required(ErrorMessage = "آی‌دی دوره اجباری است.")]
  [Range(1, 999999999, ErrorMessage = "آی‌دی دوره باید عددی مثبت باشد!")]
  public required int CourseId { get; init; }

  [Required(ErrorMessage = "شماره ترتیب اجباری است.")]
  [Range(1, 999999999, ErrorMessage = "شماره ترتیب باید عددی مثبت باشد.")]
  public required int Position { get; init; }
}
