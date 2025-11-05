using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
public class TestController : ControllerBase {
  [HttpGet("test")]
  [EndpointSummary("Test.")]
  public IActionResult Test() {
    return Ok(new { Ok = true });
  }
}
