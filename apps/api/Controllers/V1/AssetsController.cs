using Api.Contracts.Responses.V1;
using Api.Exceptions;
using Api.Mappings;
using Api.Misc;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.V1;

[ApiController]
public class AssetsController(IAssetsService assetsService) : ControllerBase {
  [HttpPost(ApiEndpoints.V1.Assets.Create)]
  [EndpointSummary("Upload an asset.")]
  public async Task<NoContentResult> UploadAsset([FromForm] IFormFile file) {
    await assetsService.UploadAsync(file);
    return NoContent();
  }

  [HttpGet(ApiEndpoints.V1.Assets.Get)]
  [EndpointSummary("Get all assets.")]
  public async Task<ActionResult<AssetsRes>> Get() {
    var assets = await assetsService.GetAllAsync();
    var res = assets.MapToRes();
    return Ok(res);
  }

  [HttpGet(ApiEndpoints.V1.Assets.GetOne)]
  [EndpointSummary("Get an asset (view or download).")]
  public async Task<IActionResult> GetOne(
    string idOrName,
    [FromQuery] bool download = false
  ) {
    try {
      var (fileStream, fileName, fileMimeType) = await assetsService.GetOneAsync(idOrName);

      var contentDisposition = download ? "attachment" : "inline";
      Response.Headers.Append("Content-Disposition", $"{contentDisposition}; filename=\"{fileName}\"");

      return File(fileStream, fileMimeType);
    }
    catch (NotFoundException ex) {
      return Problem(
        detail: ex.Message,
        statusCode: StatusCodes.Status404NotFound,
        title: Constants.ProblemDetailsTitle.NotFound
      );
    }
  }

  [HttpPut(ApiEndpoints.V1.Assets.Update)]
  [EndpointSummary("Update an asset. (NOT IMPLEMENTED)")]
  public IActionResult Update() {
    throw new NotImplementedException();
  }

  [HttpDelete(ApiEndpoints.V1.Assets.Delete)]
  [EndpointSummary("Delete an asset. (NOT IMPLEMENTED)")]
  public IActionResult Delete() {
    throw new NotImplementedException();
  }
}
