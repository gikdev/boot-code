using System.ComponentModel.DataAnnotations;

namespace Api.Contracts.Requests.V1;

public class LessonReq {
  [Required(ErrorMessage = "عنوان اجباری است.")]
  [MinLength(1, ErrorMessage = "عنوان نباید خالی باشد!")]
  public required string Title { get; set; }
  public required string? Description { get; set; }

  [Required(ErrorMessage = "آی‌دی فصل اجباری است.")]
  [Range(1, 999999999, ErrorMessage = "آی‌دی فصل باید عددی مثبت باشد!")]
  public required int Position { get; set; }

  [Required(ErrorMessage = "شماره ترتیب اجباری است.")]
  [Range(1, 999999999, ErrorMessage = "شماره ترتیب باید عددی مثبت باشد.")]
  public required int ModuleId { get; set; }
}
