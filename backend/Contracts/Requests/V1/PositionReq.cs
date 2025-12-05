using System.ComponentModel.DataAnnotations;

namespace Api.Contracts.Requests.V1;

public class PositionReq {
  [Required(ErrorMessage = "آی‌دی اجباری است.")]
  public required int Id { get; init; }

  [Required(ErrorMessage = "موقعیت اجباری است.")]
  public required int Position { get; init; }
}

