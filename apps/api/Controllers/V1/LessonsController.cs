using Api.Contracts.Requests.V1;
using Api.Contracts.Responses.V1;
using Api.Mappings;
using Api.Misc;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.V1;

[ApiController]
public class LessonsController(ILessonsService lessonsService) : ControllerBase {
  // [HttpGet(ApiEndpoints.V1.Lessons.GetOne)]
  // [
  //   EndpointSummary("Get a lesson."),
  //   ProducesResponseType(typeof(LessonFullRes), StatusCodes.Status200OK),
  //   ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound),
  // ]
  // public async Task<ActionResult<LessonFullRes>> GetOne([FromRoute] int id) {
  //   var fullLesson = await lessonsService.GetOneAsync(id);
  //   var res = fullLesson.MapToFullRes();
  //   return Ok(res);
  // }

  // [HttpPatch(ApiEndpoints.V1.Lessons.UpdateContent)]
  // [
  //   EndpointSummary("Update a lesson's content (write content)."),
  //   ProducesResponseType(typeof(void), StatusCodes.Status204NoContent),
  //   ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest),
  //   ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound),
  // ]
  // public async Task<IActionResult> UpdateContent([FromRoute] int id, [FromBody] LessonContentReq req) {
  //   var dto = req.MapToDto();
  //   await lessonsService.UpdateContentAsync(id, dto);
  //   return NoContent();
  // }

  // [HttpPut(ApiEndpoints.V1.Lessons.Update)]
  // [
  //   EndpointSummary("Update a lesson."),
  //   ProducesResponseType(typeof(void), StatusCodes.Status204NoContent),
  //   ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest),
  //   ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound),
  // ]
  // public async Task<IActionResult> Update([FromRoute] int id, [FromBody] LessonReq req) {
  //   var lesson = req.MapToEntity();
  //   await lessonsService.UpdateAsync(id, lesson);
  //   return NoContent();
  // }

  // [HttpDelete(ApiEndpoints.V1.Lessons.Delete)]
  // [
  //   EndpointSummary("Delete a lesson."),
  //   ProducesResponseType(typeof(void), StatusCodes.Status204NoContent),
  //   ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound),
  // ]
  // public async Task<IActionResult> Delete([FromRoute] int id) {
  //   await lessonsService.DeleteAsync(id);
  //   return NoContent();
  // }
}
