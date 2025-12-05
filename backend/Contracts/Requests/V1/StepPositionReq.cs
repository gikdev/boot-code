using System.ComponentModel.DataAnnotations;

namespace Api.Contracts.Requests.V1;

public class StepPositionReq {
  [Required(ErrorMessage = "شماره ترتیب اجباری است.")]
  [Range(1, 999999999, ErrorMessage = "شماره ترتیب باید عددی مثبت باشد.")]
  public required int Position { get; init; }
}
