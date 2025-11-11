using Api.Contracts.Requests.V1;
using Api.Contracts.Responses.V1;
using Api.Mappings;
using Api.Misc;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.V1;

[ApiController]
public class ModulesController(
  IModulesService modulesService,
  ILessonsService lessonsService
) : ControllerBase {
  [HttpGet(ApiEndpoints.V1.Modules.GetOne)]
  [
    EndpointSummary("Get a module."),
    ProducesResponseType(typeof(ModuleFullRes), StatusCodes.Status200OK),
    ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound),
  ]
  public async Task<ActionResult<ModuleFullRes>> GetOne([FromRoute] int id) {
    var fullModule = await modulesService.GetOneAsync(id);
    var res = fullModule.MapToFullRes();
    return Ok(res);
  }

  [HttpPut(ApiEndpoints.V1.Modules.Update)]
  [
    EndpointSummary("Update a module."),
    ProducesResponseType(StatusCodes.Status204NoContent),
    ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest),
    ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound),
  ]
  public async Task<IActionResult> Update([FromRoute] int id, [FromBody] ModuleReq req) {
    var module = req.MapToEntity();
    await modulesService.UpdateAsync(id, module);
    return NoContent();
  }

  [HttpDelete(ApiEndpoints.V1.Modules.Delete)]
  [
    EndpointSummary("Delete a module."),
    ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status204NoContent),
    ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound),
  ]
  public async Task<IActionResult> Delete([FromRoute] int id) {
    await modulesService.DeleteAsync(id);
    return NoContent();
  }

  [HttpPost(ApiEndpoints.V1.Modules.CreateLesson)]
  [
    EndpointSummary("Create a lesson."),
    ProducesResponseType(typeof(LessonRes), StatusCodes.Status201Created),
    ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest),
    ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound),
  ]
  public async Task<ActionResult<LessonRes>> CreateLesson([FromBody] LessonReq req) {
    var newLesson = req.MapToEntity();
    await lessonsService.CreateAsync(newLesson);
    var res = newLesson.MapToRes();
    return Ok(res);
  }

  [HttpGet(ApiEndpoints.V1.Modules.GetLessons)]
  [
    EndpointSummary("Get all lessons."),
    ProducesResponseType(typeof(LessonsRes), StatusCodes.Status200OK),
    ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound),
  ]
  public async Task<ActionResult<LessonsRes>> GetLessons([FromRoute] int id) {
    var lessons = await lessonsService.GetAllAsync(id);
    var res = lessons.MapToRes();
    return Ok(res);
  }
}
