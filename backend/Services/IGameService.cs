

using game_store.Models;
using game_store.Dtos;

public interface IGameService
{
    Task<List<GetGamesDto>> GetAllGames();

    Task<GetGamesDto?> GetGame(int id);
    Task<Game> AddGame(Game game);
    Task<bool> DeleteGame(int id);
}