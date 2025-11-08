using Api.Misc;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.V1;

[ApiController]
public class CurriculaController : ControllerBase {
  [HttpPost(ApiEndpoints.V1.Curricula.Create)]
  [EndpointSummary("Create a curriculum. (NOT IMPLEMENTED)")]
  public IActionResult Create() {
    throw new NotImplementedException();
  }

  [HttpGet(ApiEndpoints.V1.Curricula.Get)]
  [EndpointSummary("Get the curricula. (NOT IMPLEMENTED)")]
  public IActionResult Get() {
    throw new NotImplementedException();
  }

  [HttpGet(ApiEndpoints.V1.Curricula.GetOne)]
  [EndpointSummary("Get a curriculum. (NOT IMPLEMENTED)")]
  public IActionResult GetOne() {
    throw new NotImplementedException();
  }

  [HttpPut(ApiEndpoints.V1.Curricula.Update)]
  [EndpointSummary("Update a curriculum. (NOT IMPLEMENTED)")]
  public IActionResult Update() {
    throw new NotImplementedException();
  }

  [HttpDelete(ApiEndpoints.V1.Curricula.Delete)]
  [EndpointSummary("Delete a curriculum. (NOT IMPLEMENTED)")]
  public IActionResult Delete() {
    throw new NotImplementedException();
  }
}
