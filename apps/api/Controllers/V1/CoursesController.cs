using Api.Contracts.Requests.V1;
using Api.Contracts.Responses.V1;
using Api.Mappings;
using Api.Misc;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.V1;

[ApiController]
public class CoursesController(
  ICoursesService coursesService,
  IModulesService modulesService
) : ControllerBase {
  [HttpPost(ApiEndpoints.V1.Courses.Create)]
  [
    EndpointSummary("Create a course."),
    ProducesResponseType(typeof(CourseRes), StatusCodes.Status201Created),
    ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest),
    ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound),
  ]
  public async Task<ActionResult<CourseRes>> Create([FromBody] CourseReq req) {
    var newCourse = req.MapToEntity();
    await coursesService.CreateAsync(newCourse);
    var res = newCourse.MapToRes();
    return Ok(res);
  }

  [HttpGet(ApiEndpoints.V1.Courses.Get)]
  [
    EndpointSummary("Get all courses."),
    ProducesResponseType(typeof(CoursesRes), StatusCodes.Status200OK),
  ]
  public async Task<ActionResult<CoursesRes>> Get() {
    var courses = await coursesService.GetAllAsync();
    var res = courses.MapToRes();
    return Ok(res);
  }

  [HttpGet(ApiEndpoints.V1.Courses.GetOne)]
  [
    EndpointSummary("Get a course."),
    ProducesResponseType(typeof(CourseFullRes), StatusCodes.Status200OK),
    ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound),
  ]
  public async Task<ActionResult<CourseFullRes>> GetOne([FromRoute] int id) {
    var course = await coursesService.GetOneAsync(id);
    var res = course.MapToFullRes();
    return Ok(res);
  }

  [HttpPut(ApiEndpoints.V1.Courses.Update)]
  [
    EndpointSummary("Update a course."),
    ProducesResponseType(StatusCodes.Status204NoContent),
    ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest),
    ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound),
  ]
  public async Task<IActionResult> Update([FromRoute] int id, [FromBody] CourseReq req) {
    var course = req.MapToEntity();
    await coursesService.UpdateAsync(id, course);
    return NoContent();
  }

  [HttpDelete(ApiEndpoints.V1.Courses.Delete)]
  [
    EndpointSummary("Delete a course."),
    ProducesResponseType(StatusCodes.Status204NoContent),
    ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound),
  ]
  public async Task<IActionResult> Delete([FromRoute] int id) {
    await coursesService.DeleteAsync(id);
    return NoContent();
  }

  // [HttpPost(ApiEndpoints.V1.Courses.CreateModule)]
  // [
  //   EndpointSummary("Create a module."),
  //   ProducesResponseType(typeof(ModuleRes), StatusCodes.Status201Created),
  //   ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest),
  //   ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound),
  // ]
  // public async Task<ActionResult<ModuleRes>> CreateModule([FromRoute] int id, [FromBody] ModuleReq req) {
  //   var newModule = req.MapToEntity();
  //   await modulesService.CreateAsync(id, newModule);
  //   var res = newModule.MapToRes();
  //   return Ok(res);
  // }
}
