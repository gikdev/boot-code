using Api.Contracts.Requests.V1;
using Api.Contracts.Responses.V1;
using Api.Exceptions;
using Api.Mappings;
using Api.Misc;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.V1;

[ApiController]
public class CoursesController(ICoursesService coursesService) : ControllerBase {
  [HttpPost(ApiEndpoints.V1.Courses.Create)]
  [EndpointSummary("Create a course.")]
  [ProducesResponseType(typeof(NewCourseRes), StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  public async Task<ActionResult<NewCourseRes>> Create([FromBody] CourseReq req) {
    try {
      var newCourse = await coursesService.CreateAsync(req);
      var res = newCourse.MapToNewCourseRes();
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

  [HttpGet(ApiEndpoints.V1.Courses.Get)]
  [EndpointSummary("Get the courses.")]
  [ProducesResponseType(typeof(CoursesRes), StatusCodes.Status200OK)]
  public async Task<ActionResult<CoursesRes>> Get() {
    var courses = await coursesService.GetAllAsync();
    var res = courses.MapToRes();
    return Ok(res);
  }

  [HttpGet(ApiEndpoints.V1.Courses.GetOne)]
  [EndpointSummary("Get a course.")]
  [ProducesResponseType(typeof(CourseRes), StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  public async Task<ActionResult<CourseRes>> GetOne([FromRoute] int id) {
    try {
      var course = await coursesService.GetOneAsync(id);
      var res = course.MapToRes();
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

  [HttpPut(ApiEndpoints.V1.Courses.Update)]
  [EndpointSummary("Update a course.")]
  [ProducesResponseType(StatusCodes.Status204NoContent)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  public async Task<IActionResult> Update([FromRoute] int id, [FromBody] CourseReq req) {
    try {
      await coursesService.UpdateAsync(id, req);
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

  [HttpDelete(ApiEndpoints.V1.Courses.Delete)]
  [EndpointSummary("Delete a course.")]
  [ProducesResponseType(StatusCodes.Status204NoContent)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  public async Task<IActionResult> Delete([FromRoute] int id) {
    try {
      await coursesService.DeleteAsync(id);
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
