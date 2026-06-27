
using game_store.Data;
using game_store.Models;
using game_store.Dtos;
using Microsoft.EntityFrameworkCore;

public class GameService(GameStoreDbContext context) : IGameService
{
    private readonly GameStoreDbContext _context = context;
    public async Task<List<GetGamesDto>> GetAllGames()
    {
        return await _context.Games
            .Include(g => g.Genre)
            .Include(g => g.Company)
            .Select(g => new GetGamesDto(
                g.Id,
                g.Name,
                g.Description,
                g.GenreId,
                g.Genre!.Name,
                g.ReleaseDate,
                g.CompanyId,
                g.Company!.Name,
                g.Price,
                g.IsAvailable,
                g.CoverImageUrl,
                g.CardImageUrl,
                g.Platforms
            ))
            .ToListAsync();
    }

    public async Task<GetGamesDto?> GetGame(int id)
    {
        return await _context.Games
            .Include(g => g.Genre)
            .Include(g => g.Company)
            .Where(g => g.Id == id)
            .Select(g => new GetGamesDto(
                g.Id,
                g.Name,
                g.Description,
                g.GenreId,
                g.Genre!.Name,
                g.ReleaseDate,
                g.CompanyId,
                g.Company!.Name,
                g.Price,
                g.IsAvailable,
                g.CoverImageUrl,
                g.CardImageUrl,
                g.Platforms
            ))
            .FirstOrDefaultAsync();
    }
    public async Task<Game> AddGame(Game game)
    {
        await _context.Games.AddAsync(game);
        await _context.SaveChangesAsync();

        return game;
    }
    public async Task<bool> DeleteGame(int id)
    {
        var game = await _context.Games.FindAsync(id);

        if (game == null)
            return false;

        _context.Games.Remove(game);
        await _context.SaveChangesAsync();

        return true;
    }
}