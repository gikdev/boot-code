using Api.Data;
using Api.Entities;
using Api.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public interface IAssetsService {
  Task<Asset> UploadAsync(IFormFile file, string? Description = null);
  Task<IEnumerable<Asset>> GetAllAsync();
  Task<Asset> GetOneAsync(string idOrName);
  Task<(FileStream fileStream, string fileName, string fileMimeType)> GetOneFileAsync(string idOrName);
  Task DeleteAsync(int id);
  Task<bool> ExistsAsync(string idOrName, bool alsoCheckForFile = true);
  Task<bool> IsUsedAsync(int id);
}

public class AssetsService(DbCtx db) : IAssetsService {
  public async Task<Asset> UploadAsync(IFormFile file, string? Description = null) {
    // Setup
    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
    if (!Directory.Exists(uploadsFolder))
      Directory.CreateDirectory(uploadsFolder);

    // Extract info out
    var extension = Path.GetExtension(file.FileName);
    var contentType = file.ContentType;
    var fileGuid = Guid.NewGuid().ToString();
    var fullFilePath = Path.Combine(uploadsFolder, fileGuid + extension);

    // save the file itself
    using var stream = new FileStream(fullFilePath, FileMode.Create);
    await file.CopyToAsync(stream);

    // save the file in DB
    var newAsset = new Asset {
      MimeType = contentType,
      Name = fileGuid,
      Description = Description,
    };

    db.Assets.Add(newAsset);

    await db.SaveChangesAsync();

    return newAsset;
  }

  public async Task<IEnumerable<Asset>> GetAllAsync()
    => await db.Assets.ToListAsync();

  public async Task<Asset> GetOneAsync(string idOrName)
    => (int.TryParse(idOrName, out var id)
      ? await db.Assets.FirstOrDefaultAsync(a => a.Id == id)
      : await db.Assets.FirstOrDefaultAsync(a => a.Name == idOrName))
      ?? throw new NotFoundException();

  public async Task<(FileStream fileStream, string fileName, string fileMimeType)> GetOneFileAsync(string idOrName) {
    var asset = (int.TryParse(idOrName, out var id)
        ? await db.Assets.FirstOrDefaultAsync(a => a.Id == id)
        : await db.Assets.FirstOrDefaultAsync(a => a.Name == idOrName))
        ?? throw new NotFoundException();

    // Build physical path
    var fileName = asset.Name + GetExtensionFromMimeType(asset.MimeType);
    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", fileName);
    if (!File.Exists(filePath)) throw new NotFoundException("فایل");

    // Open stream
    var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);

    return (fileStream, fileName, asset.MimeType);
  }

  private static string GetExtensionFromMimeType(string mimeType)
    => mimeType switch {
      // Images
      "image/png" => ".png",
      "image/jpeg" => ".jpg",
      "image/jpg" => ".jpg",
      "image/gif" => ".gif",
      "image/webp" => ".webp",
      "image/bmp" => ".bmp",
      "image/tiff" => ".tiff",
      "image/svg+xml" => ".svg",
      "image/x-icon" => ".ico",

      // Audio
      "audio/mpeg" => ".mp3",
      "audio/wav" => ".wav",
      "audio/ogg" => ".ogg",
      "audio/flac" => ".flac",
      "audio/aac" => ".aac",
      "audio/webm" => ".webm",

      // Video
      "video/mp4" => ".mp4",
      "video/webm" => ".webm",
      "video/x-msvideo" => ".avi",
      "video/quicktime" => ".mov",
      "video/x-matroska" => ".mkv",

      // Documents & Text
      "application/pdf" => ".pdf",
      "text/plain" => ".txt",
      "text/csv" => ".csv",
      "application/json" => ".json",
      "application/xml" => ".xml",
      "text/html" => ".html",
      "text/css" => ".css",
      "text/javascript" => ".js",

      // MS Office
      "application/msword" => ".doc",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" => ".docx",
      "application/vnd.ms-excel" => ".xls",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" => ".xlsx",
      "application/vnd.ms-powerpoint" => ".ppt",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation" => ".pptx",

      // Archives
      "application/zip" => ".zip",
      "application/x-7z-compressed" => ".7z",
      "application/x-rar-compressed" => ".rar",
      "application/gzip" => ".gz",
      "application/x-tar" => ".tar",

      // Code & Dev
      "application/x-sh" => ".sh",
      "application/x-httpd-php" => ".php",
      "application/java-archive" => ".jar",
      "text/x-python" => ".py",
      "text/x-csharp" => ".cs",
      "text/x-java-source" => ".java",
      "text/x-typescript" => ".ts",

      // Fallback
      _ => ".txt"
    };

  public async Task DeleteAsync(int id) {
    var asset = await db.Assets.FirstOrDefaultAsync(a => a.Id == id)
                ?? throw new NotFoundException();

    var isInUse = await IsUsedAsync(id);
    if (isInUse) throw new EntityInUseException("فایل در دوره");

    var fileName = asset.Name + GetExtensionFromMimeType(asset.MimeType);
    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", fileName);
    if (File.Exists(filePath))
      File.Delete(filePath);

    db.Assets.Remove(asset);

    await db.SaveChangesAsync();
  }

  public async Task<bool> ExistsAsync(string idOrName, bool alsoCheckForFile = true) {
    var asset = int.TryParse(idOrName, out var id)
        ? await db.Assets.FirstOrDefaultAsync(a => a.Id == id)
        : await db.Assets.FirstOrDefaultAsync(a => a.Name == idOrName);

    if (asset == null) return false;

    if (alsoCheckForFile) {
      var fileName = asset.Name + GetExtensionFromMimeType(asset.MimeType);
      var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", fileName);
      var fileExists = File.Exists(filePath);
      if (!fileExists) return false;
    }

    return true;
  }

  public async Task<bool> IsUsedAsync(int id) {
    var exists = await ExistsAsync(id.ToString());
    if (!exists) throw new NotFoundException();

    var isUsedInCourse = await db.Courses.AnyAsync(c => c.ThumbnailId == id);

    var isInUse = isUsedInCourse;

    return isInUse;
  }
}
