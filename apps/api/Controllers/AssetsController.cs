using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace Api.Controllers;

[Route("api/assets")]
[ApiController]
public class AssetsController : ControllerBase {
  [HttpPost]
  public IActionResult UploadAsset(IFormFile file) {
    var extension = Path.GetExtension(file.FileName);
    var contentType = file.ContentType;
    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
    var newFileName = Guid.NewGuid().ToString() + extension;
    var fullFilePath = Path.Combine(uploadsFolder, newFileName);

    using var stream = new FileStream(fullFilePath, FileMode.Create);
    file.CopyTo(stream);

    return Ok(new {
      extension,
      uploadsFolder,
      contentType,
      newFileName,
      fullFilePath,
      Success = true,
    });
  }
}
