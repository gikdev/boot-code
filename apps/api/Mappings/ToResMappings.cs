using Api.Contracts.Responses.V1;
using Api.Entities;

namespace Api.Mappings;

public static class ResMappings {
  public static AssetRes MapToRes(this Asset asset) => new() {
    CreatedAt = asset.CreatedAt,
    Description = asset.Description,
    Id = asset.Id,
    MimeType = asset.MimeType,
    Name = asset.Name,
  };

  public static AssetsRes MapToRes(this IEnumerable<Asset> assets) => new() {
    Items = assets.Select(a => a.MapToRes()),
  };

  public static CurriculumRes MapToRes(this Curriculum curriculum) => new() {
    Id = curriculum.Id,
    Title = curriculum.Title,
    Description = curriculum.Description,
    CreatedAt = curriculum.CreatedAt,
  };

  public static CurriculaRes MapToRes(this IEnumerable<Curriculum> curricula) => new() {
    Items = curricula.Select(c => c.MapToRes()),
  };
}
