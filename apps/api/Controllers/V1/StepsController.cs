using Api.Misc;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.V1;

[ApiController]
public class StepsController : ControllerBase {
  [HttpPatch(ApiEndpoints.V1.Steps.UpdatePosition)]
  [EndpointSummary("⛔ Update a step's position.")]
  [ProducesResponseType(StatusCodes.Status501NotImplemented)]
  public IActionResult UpdatePosition([FromRoute] int id) {
    throw new NotImplementedException();
  }

  [HttpDelete(ApiEndpoints.V1.Steps.Delete)]
  [EndpointSummary("⛔ Delete a step.")]
  [ProducesResponseType(StatusCodes.Status501NotImplemented)]
  public IActionResult Delete([FromRoute] int id) {
    throw new NotImplementedException();
  }
}
