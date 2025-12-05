using System.ComponentModel.DataAnnotations;

namespace Api.Contracts.Requests.V1;

public class StepReq {
  [Required(ErrorMessage = "شماره ترتیب اجباری است.")]
  [Range(1, 999999999, ErrorMessage = "شماره ترتیب باید عددی مثبت باشد.")]
  public required int Position { get; init; }

  [Required(ErrorMessage = "آی‌دی درس اجباری است.")]
  [Range(1, 999999999, ErrorMessage = "آی‌دی درس باید عددی مثبت باشد!")]
  public required int LessonId { get; init; }

  [Required(ErrorMessage = "آی‌دی کوریکولوم اجباری است.")]
  [Range(1, 999999999, ErrorMessage = "آی‌دی کوریکولوم باید عددی مثبت باشد!")]
  public required int CurriculumId { get; init; }
}
