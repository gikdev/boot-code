using Api.Misc;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.V1;

[ApiController]
public class CoursesController : ControllerBase {
  [HttpPost(ApiEndpoints.V1.Courses.Create)]
  [EndpointSummary("Create a course. (NOT IMPLEMENTED)")]
  public IActionResult Create() {
    throw new NotImplementedException();
  }

  [HttpGet(ApiEndpoints.V1.Courses.Get)]
  [EndpointSummary("Get the courses. (NOT IMPLEMENTED)")]
  public IActionResult Get() {
    throw new NotImplementedException();
  }

  [HttpGet(ApiEndpoints.V1.Courses.GetOne)]
  [EndpointSummary("Get a course. (NOT IMPLEMENTED)")]
  public IActionResult GetOne() {
    throw new NotImplementedException();
  }

  [HttpPut(ApiEndpoints.V1.Courses.Update)]
  [EndpointSummary("Update a course. (NOT IMPLEMENTED)")]
  public IActionResult Update() {
    throw new NotImplementedException();
  }

  [HttpDelete(ApiEndpoints.V1.Courses.Delete)]
  [EndpointSummary("Delete a course. (NOT IMPLEMENTED)")]
  public IActionResult Delete() {
    throw new NotImplementedException();
  }
}


