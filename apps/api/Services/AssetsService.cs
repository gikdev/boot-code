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
      "image/png" => ".png",
      "image/jpeg" => ".jpg",
      "image/gif" => ".gif",
      "image/webp" => ".webp",
      "audio/mpeg" => ".mp3",
      "audio/wav" => ".wav",
      "video/mp4" => ".mp4",
      "application/pdf" => ".pdf",
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
