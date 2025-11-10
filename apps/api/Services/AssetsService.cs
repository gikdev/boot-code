using Api.Data;
using Api.Entities;
using Api.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public interface IAssetsService {
  Task UploadAsync(IFormFile file);
  Task<IEnumerable<Asset>> GetAllAsync();
  Task<(FileStream fileStream, string fileName, string fileMimeType)> GetOneAsync(string idOrName);
  Task DeleteAsync(string idOrName);
  Task<bool> ExistsAsync(string idOrName, bool alsoCheckForFile = true);
}

public class AssetsService(DbCtx db) : IAssetsService {
  public async Task UploadAsync(IFormFile file) {
    // Setup
    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

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
    };

    await db.Assets.AddAsync(newAsset);

    await db.SaveChangesAsync();
  }

  public async Task<IEnumerable<Asset>> GetAllAsync()
    => await db.Assets.ToListAsync();

  public async Task<(FileStream fileStream, string fileName, string fileMimeType)> GetOneAsync(string idOrName) {
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

  public async Task DeleteAsync(string idOrName) {
    var asset = (int.TryParse(idOrName, out var id)
        ? await db.Assets.FirstOrDefaultAsync(a => a.Id == id)
        : await db.Assets.FirstOrDefaultAsync(a => a.Name == idOrName))
        ?? throw new NotFoundException();

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
}
