using Api.Contracts.Requests.V1;
using Api.Contracts.Responses.V1;
using Api.Exceptions;
using Api.Mappings;
using Api.Misc;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.V1;

[ApiController]
public class CurriculaController(ICurriculaService curriculaService) : ControllerBase {
  [HttpPost(ApiEndpoints.V1.Curricula.Create)]
  [EndpointSummary("Create a curriculum.")]
  [ProducesResponseType(typeof(CurriculumRes), StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  public async Task<ActionResult<CurriculumRes>> Create([FromBody] CurriculumReq req) {
    var newCurriculum = await curriculaService.CreateAsync(req);
    var res = newCurriculum.MapToRes();
    return Ok(res);
  }

  [HttpGet(ApiEndpoints.V1.Curricula.Get)]
  [EndpointSummary("Get the curricula.")]
  [ProducesResponseType(typeof(CurriculaRes), StatusCodes.Status200OK)]
  public async Task<ActionResult<CurriculaRes>> Get() {
    var curricula = await curriculaService.GetAllAsync();
    var res = curricula.MapToRes();
    return Ok(res);
  }

  [HttpGet(ApiEndpoints.V1.Curricula.GetOne)]
  [EndpointSummary("Get a curriculum.")]
  [ProducesResponseType(typeof(CurriculumRes), StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  public async Task<ActionResult<CurriculumRes>> GetOne([FromRoute] int id) {
    try {
      var curriculum = await curriculaService.GetOneAsync(id);
      var res = curriculum.MapToRes();
      return Ok(res);
    }
    catch (NotFoundException ex) {
      return Problem(
        detail: ex.Message,
        statusCode: StatusCodes.Status404NotFound,
        title: Constants.ProblemDetailsTitle.NotFound
      );
    }
  }

  [HttpPut(ApiEndpoints.V1.Curricula.Update)]
  [EndpointSummary("Update a curriculum.")]
  [ProducesResponseType(StatusCodes.Status204NoContent)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  public async Task<IActionResult> Update([FromRoute] int id, [FromBody] CurriculumReq req) {
    try {
      await curriculaService.UpdateAsync(id, req);
      return NoContent();
    }
    catch (NotFoundException ex) {
      return Problem(
        detail: ex.Message,
        statusCode: StatusCodes.Status404NotFound,
        title: Constants.ProblemDetailsTitle.NotFound
      );
    }
  }

  [HttpDelete(ApiEndpoints.V1.Curricula.Delete)]
  [EndpointSummary("Delete a curriculum.")]
  [ProducesResponseType(StatusCodes.Status204NoContent)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  public async Task<IActionResult> Delete([FromRoute] int id) {
    try {
      await curriculaService.DeleteAsync(id);
      return NoContent();
    }
    catch (NotFoundException ex) {
      return Problem(
        detail: ex.Message,
        statusCode: StatusCodes.Status404NotFound,
        title: Constants.ProblemDetailsTitle.NotFound
      );
    }
  }
}
