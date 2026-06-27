
using pixelgate.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace pixelgate.Controllers;

[ApiController]
[Route("[controller]")]
public class GamesController(IGameService service) : ControllerBase
{
    private readonly IGameService _service = service;

    [HttpGet(Name = "GetGames")]
    public Task<List<GetGamesDto>> GetAllGames()
    {
        return _service.GetAllGames();
    }

    [HttpGet("{id}")]
    public Task<GetGamesDto?> GetGame(int id)
    {
        return _service.GetGame(id);
    }
}
