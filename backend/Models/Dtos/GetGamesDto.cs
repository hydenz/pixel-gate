using pixelgate.Models;

namespace pixelgate.Dtos;

public record GetGamesDto(
    int Id,
    string Name,
    string Description,
    int GenreId,
    string GenreName,
    DateOnly ReleaseDate,
    int CompanyId,
    string CompanyName,
    decimal Price,
    bool IsAvailable,
    string? CoverImageUrl,
    string? CardImageUrl,
    List<Platform> Platforms
);