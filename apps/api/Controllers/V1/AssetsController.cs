using Api.Contracts.Responses.V1;
using Api.Mappings;
using Api.Misc;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.V1;

[ApiController]
public class AssetsController(IAssetsService assetsService) : ControllerBase {
  [HttpPost(ApiEndpoints.V1.Assets.Create)]
  [
    EndpointSummary("Upload an asset."),
    ProducesResponseType(typeof(AssetRes), StatusCodes.Status201Created),
    ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest),
  ]
  public async Task<ActionResult<AssetRes>> UploadAsset(IFormFile file) {
    var asset = await assetsService.UploadAsync(file);
    var res = asset.MapToRes();
    return Ok(res);
  }

  [HttpGet(ApiEndpoints.V1.Assets.Get)]
  [
    EndpointSummary("Get all assets."),
    ProducesResponseType(typeof(AssetsRes), StatusCodes.Status200OK),
  ]
  public async Task<ActionResult<AssetsRes>> Get() {
    var assets = await assetsService.GetAllAsync();
    var res = assets.MapToRes();
    return Ok(res);
  }

  [HttpGet(ApiEndpoints.V1.Assets.GetOne)]
  [
    EndpointSummary("Get an asset."),
    ProducesResponseType(typeof(AssetRes), StatusCodes.Status200OK),
    ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound),
  ]
  public async Task<ActionResult<AssetRes>> GetOne([FromRoute] string idOrName) {
    var asset = await assetsService.GetOneAsync(idOrName);
    var res = asset.MapToRes();
    return Ok(res);
  }

  [HttpGet(ApiEndpoints.V1.Assets.GetOneFile)]
  [
    EndpointSummary("View / download an asset."),
    ProducesResponseType(typeof(void), StatusCodes.Status200OK),
    ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound),
  ]
  public async Task<IActionResult> GetOneFile(
    [FromRoute] string idOrName,
    [FromQuery] bool download = false
  ) {
    var (fileStream, fileName, fileMimeType) = await assetsService.GetOneFileAsync(idOrName);

    var contentDisposition = download ? "attachment" : "inline";
    Response.Headers.Append("Content-Disposition", $"{contentDisposition}; filename=\"{fileName}\"");

    return File(fileStream, fileMimeType);
  }

  [HttpDelete(ApiEndpoints.V1.Assets.Delete)]
  [
    EndpointSummary("Delete an asset."),
    ProducesResponseType(typeof(void), StatusCodes.Status204NoContent),
    ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound),
  ]
  public async Task<IActionResult> Delete([FromRoute] string idOrName) {
    await assetsService.DeleteAsync(idOrName);
    return NoContent();
  }
}
