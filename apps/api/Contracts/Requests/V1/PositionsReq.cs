using System.ComponentModel.DataAnnotations;

namespace Api.Contracts.Requests.V1;

public class PositionsReq {
  [Required(ErrorMessage = "آرایه موقعیت‌ها اجباری است.")]
  public required IEnumerable<PositionReq> Positions { get; init; }
}
