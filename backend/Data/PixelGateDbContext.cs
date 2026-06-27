using System.Text.Json;
using pixelgate.Models;
using Microsoft.EntityFrameworkCore;

namespace pixelgate.Data;

public class PixelGateDbContext(DbContextOptions<PixelGateDbContext> options) : DbContext(options)
{
    public DbSet<Game> Games => Set<Game>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Game>()
            .Property(g => g.Platforms)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<List<Platform>>(v, (JsonSerializerOptions?)null) ?? new List<Platform>()
            );

        modelBuilder.Entity<Genre>().HasData(
            new Genre { Id = 1, Name = "RPG" },
            new Genre { Id = 2, Name = "Action" },
            new Genre { Id = 3, Name = "Adventure" }
        );

        modelBuilder.Entity<Company>().HasData(
            new Company { Id = 1, Name = "CD Projekt Red" },
            new Company { Id = 2, Name = "FromSoftware" },
            new Company { Id = 3, Name = "Rockstar Games" },
            new Company { Id = 4, Name = "Studio MDHR" },
            new Company { Id = 5, Name = "Toys for Bob" },
            new Company { Id = 6, Name = "ConcernedApe" }
        );

        modelBuilder.Entity<Game>().HasData(
            new Game
            {
                Id = 1,
                Name = "The Witcher 3: Wild Hunt",
                Description = "An open-world action RPG set in a dark fantasy universe.",
                GenreId = 1,
                ReleaseDate = new DateOnly(2015, 5, 19),
                CompanyId = 1,
                Price = 39.99m,
                IsAvailable = true,
                CoverImageUrl = "https://res.cloudinary.com/dcbkiur84/image/upload/v1782505011/kh4MUIuMmHlktOHar3lVl6rY_pwtvx4.jpg",
                CardImageUrl = "https://res.cloudinary.com/dcbkiur84/image/upload/v1782507807/new-witcher-wild-hunt-logo-v0-gCzbZVZx31hdPm1UN36U98kVIptlR_lLDLYXmEV1QXU_oscoju.webp",
                Platforms = new List<Platform> { Platform.PC }
            },
            new Game
            {
                Id = 2,
                Name = "Cyberpunk 2077",
                Description = "A futuristic open-world RPG set in Night City.",
                GenreId = 1,
                ReleaseDate = new DateOnly(2020, 12, 10),
                CompanyId = 1,
                Price = 59.99m,
                IsAvailable = true,
                CoverImageUrl = "https://res.cloudinary.com/dcbkiur84/image/upload/v1782508043/EGS_Cyberpunk2077_CDPROJEKTRED_S1_03_2560x1440-359e77d3cd0a40aebf3bbc130d14c5c7_lujx3a.jpg",
                CardImageUrl = "https://res.cloudinary.com/dcbkiur84/image/upload/v1782508043/EGS_Cyberpunk2077_CDPROJEKTRED_S1_03_2560x1440-359e77d3cd0a40aebf3bbc130d14c5c7_lujx3a.jpg",
                Platforms = new List<Platform> { Platform.PC, Platform.PS5 }
            },
            new Game
            {
                Id = 3,
                Name = "Elden Ring",
                Description = "Explore the Lands Between in this epic action RPG.",
                GenreId = 1,
                ReleaseDate = new DateOnly(2022, 2, 25),
                CompanyId = 2,
                Price = 59.99m,
                IsAvailable = true,
                CoverImageUrl = "https://example.com/images/eldenring.jpg",
                CardImageUrl = null,
                Platforms = new List<Platform> { Platform.PS5, Platform.XboxSeriesX }
            },
            new Game
            {
                Id = 4,
                Name = "Cuphead",
                Description = "A run-and-gun indie game with hand-drawn 1930s cartoon art style.",
                GenreId = 2,
                ReleaseDate = new DateOnly(2017, 9, 29),
                CompanyId = 4,
                Price = 19.99m,
                IsAvailable = true,
                CoverImageUrl = "https://res.cloudinary.com/dcbkiur84/image/upload/v1782567898/Cuphead_capa_sqc05m.png",
                CardImageUrl = "https://res.cloudinary.com/dcbkiur84/image/upload/v1782567890/apps.58691.13670972585585116.3e5032b0-0174-4e7d-b3ed-55f9306df6f1_nvylrq.jpg",
                Platforms = new List<Platform> { Platform.PC, Platform.XboxSeriesX, Platform.NintendoSwitch }
            },
            new Game
            {
                Id = 5,
                Name = "Crash Bandicoot 4: It's About Time",
                Description = "A brand new Crash Bandicoot adventure with classic platforming action.",
                GenreId = 3,
                ReleaseDate = new DateOnly(2020, 10, 2),
                CompanyId = 5,
                Price = 39.99m,
                IsAvailable = true,
                CoverImageUrl = "https://example.com/images/crash4.jpg",
                CardImageUrl = null,
                Platforms = new List<Platform> { Platform.PC, Platform.PS5, Platform.XboxSeriesX, Platform.NintendoSwitch }
            },
            new Game
            {
                Id = 6,
                Name = "GTA VI",
                Description = "The next entry in the Grand Theft Auto series, coming to modern consoles.",
                GenreId = 2,
                ReleaseDate = new DateOnly(2025, 9, 30),
                CompanyId = 3,
                Price = 69.99m,
                IsAvailable = false,
                CoverImageUrl = "https://res.cloudinary.com/dcbkiur84/image/upload/v1782568287/grand-theft-auto-vi_8stb_mbvxrc.jpg",
                CardImageUrl = "https://res.cloudinary.com/dcbkiur84/image/upload/v1782568319/gta-vi_mkgvim.jpg",
                Platforms = new List<Platform> { Platform.PS5, Platform.XboxSeriesX }
            },
            new Game
            {
                Id = 7,
                Name = "Stardew Valley",
                Description = "A farming simulation RPG set in a charming rural world.",
                GenreId = 1,
                ReleaseDate = new DateOnly(2016, 2, 26),
                CompanyId = 6,
                Price = 14.99m,
                IsAvailable = true,
                CoverImageUrl = "https://example.com/images/stardew.jpg",
                CardImageUrl = null,
                Platforms = new List<Platform> { Platform.PC, Platform.NintendoSwitch }
            }
        );
    }
}