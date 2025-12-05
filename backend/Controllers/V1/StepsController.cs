using Api.Contracts.Requests.V1;
using Api.Misc;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.V1;

[ApiController]
public class StepsController(IStepsService stepsService) : ControllerBase {
  // [HttpPatch(ApiEndpoints.V1.Steps.UpdatePosition)]
  // [
  //   EndpointSummary("Update a step's position."),
  //   ProducesResponseType(typeof(void), StatusCodes.Status204NoContent),
  //   ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest),
  //   ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound),
  // ]
  // public async Task<IActionResult> UpdatePosition([FromRoute] int id, StepPositionReq req) {
  //   await stepsService.UpdatePositionAsync(id, req.Position);
  //   return NoContent();
  // }

  // [HttpDelete(ApiEndpoints.V1.Steps.Delete)]
  // [
  //   EndpointSummary("Delete a step."),
  //   ProducesResponseType(typeof(void), StatusCodes.Status204NoContent),
  //   ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound),
  // ]
  // public async Task<IActionResult> Delete([FromRoute] int id) {
  //   await stepsService.DeleteAsync(id);
  //   return NoContent();
  // }
}
