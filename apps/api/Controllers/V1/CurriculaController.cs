using Api.Contracts.Requests.V1;
using Api.Contracts.Responses.V1;
using Api.Mappings;
using Api.Misc;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.V1;

[ApiController]
public class CurriculaController(
  ICurriculaService curriculaService,
  IStepsService stepsService
) : ControllerBase {
  // [HttpPost(ApiEndpoints.V1.Curricula.Create)]
  // [
  //   EndpointSummary("Create a curriculum."),
  //   ProducesResponseType(typeof(CurriculumRes), StatusCodes.Status201Created),
  //   ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest),
  // ]
  // public async Task<ActionResult<CurriculumRes>> Create([FromBody] CurriculumReq req) {
  //   var newCurriculum = req.MapToEntity();
  //   await curriculaService.CreateAsync(newCurriculum);
  //   var res = newCurriculum.MapToRes();
  //   return Ok(res);
  // }

  // [HttpGet(ApiEndpoints.V1.Curricula.Get)]
  // [
  //   EndpointSummary("Get all curricula."),
  //   ProducesResponseType(typeof(CurriculaRes), StatusCodes.Status200OK),
  // ]
  // public async Task<ActionResult<CurriculaRes>> Get() {
  //   var curricula = await curriculaService.GetAllAsync();
  //   var res = curricula.MapToRes();
  //   return Ok(res);
  // }

  // [HttpGet(ApiEndpoints.V1.Curricula.GetOne)]
  // [
  //   EndpointSummary("Get a curriculum."),
  //   ProducesResponseType(typeof(CurriculumFullRes), StatusCodes.Status200OK),
  //   ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound),
  // ]
  // public async Task<ActionResult<CurriculumFullRes>> GetOne([FromRoute] int id) {
  //   var fullCurriculum = await curriculaService.GetOneAsync(id);
  //   var res = fullCurriculum.MapToFullRes();
  //   return Ok(res);
  // }

  // [HttpPut(ApiEndpoints.V1.Curricula.Update)]
  // [
  //   EndpointSummary("Update a curriculum."),
  //   ProducesResponseType(typeof(void), StatusCodes.Status204NoContent),
  //   ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest),
  //   ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound),
  // ]
  // public async Task<IActionResult> Update([FromRoute] int id, [FromBody] CurriculumReq req) {
  //   var curriculum = req.MapToEntity();
  //   await curriculaService.UpdateAsync(id, curriculum);
  //   return NoContent();
  // }

  // [HttpDelete(ApiEndpoints.V1.Curricula.Delete)]
  // [
  //   EndpointSummary("Delete a curriculum."),
  //   ProducesResponseType(typeof(void), StatusCodes.Status204NoContent),
  //   ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound),
  // ]
  // public async Task<IActionResult> Delete([FromRoute] int id) {
  //   await curriculaService.DeleteAsync(id);
  //   return NoContent();
  // }

  // [HttpPost(ApiEndpoints.V1.Curricula.CreateStep)]
  // [
  //   EndpointSummary("Create a step."),
  //   ProducesResponseType(typeof(StepFullRes), StatusCodes.Status201Created),
  //   ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest),
  // ]
  // public async Task<ActionResult<StepFullRes>> CreateStep([FromBody] StepReq req) {
  //   var step = req.MapToEntity();
  //   var newStep = await stepsService.CreateAsync(step);
  //   var res = newStep.MapToFullRes();
  //   return Ok(res);
  // }

  // [HttpGet(ApiEndpoints.V1.Curricula.GetSteps)]
  // [
  //   EndpointSummary("Get all steps."),
  //   ProducesResponseType(typeof(StepsFullRes), StatusCodes.Status200OK),
  // ]
  // public async Task<ActionResult<StepsFullRes>> GetSteps([FromRoute] int id) {
  //   var steps = await stepsService.GetAllAsync(id);
  //   var res = steps.MapToFullRes();
  //   return Ok(res);
  // }
}
