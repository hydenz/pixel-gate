namespace game_store.Models;

public class Game
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public int GenreId { get; set; }
    public Genre? Genre { get; set; }
    public required DateOnly ReleaseDate { get; set; }
    public required int CompanyId { get; set; }
    public Company? Company { get; set; }
    public decimal Price { get; set; }
    public bool IsAvailable { get; set; }
    public string? CoverImageUrl { get; set; }
    public string? CardImageUrl { get; set; }

    public required List<Platform> Platforms { get; set; }

}
public enum Platform
{
    PC,
    PS5,
    XboxSeriesX,
    NintendoSwitch
}