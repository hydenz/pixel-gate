using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace pixelgate.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Company",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Company", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Genre",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Genre", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Games",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    GenreId = table.Column<int>(type: "INTEGER", nullable: false),
                    ReleaseDate = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    CompanyId = table.Column<int>(type: "INTEGER", nullable: false),
                    Price = table.Column<decimal>(type: "TEXT", nullable: false),
                    IsAvailable = table.Column<bool>(type: "INTEGER", nullable: false),
                    CoverImageUrl = table.Column<string>(type: "TEXT", nullable: true),
                    CardImageUrl = table.Column<string>(type: "TEXT", nullable: true),
                    Platforms = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Games", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Games_Company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Games_Genre_GenreId",
                        column: x => x.GenreId,
                        principalTable: "Genre",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Company",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "CD Projekt Red" },
                    { 2, "FromSoftware" },
                    { 3, "Rockstar Games" },
                    { 4, "Studio MDHR" },
                    { 5, "Toys for Bob" },
                    { 6, "ConcernedApe" }
                });

            migrationBuilder.InsertData(
                table: "Genre",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "RPG" },
                    { 2, "Action" },
                    { 3, "Adventure" }
                });

            migrationBuilder.InsertData(
                table: "Games",
                columns: new[] { "Id", "CardImageUrl", "CompanyId", "CoverImageUrl", "Description", "GenreId", "IsAvailable", "Name", "Platforms", "Price", "ReleaseDate" },
                values: new object[,]
                {
                    { 1, "https://res.cloudinary.com/dcbkiur84/image/upload/v1782507807/new-witcher-wild-hunt-logo-v0-gCzbZVZx31hdPm1UN36U98kVIptlR_lLDLYXmEV1QXU_oscoju.webp", 1, "https://res.cloudinary.com/dcbkiur84/image/upload/v1782505011/kh4MUIuMmHlktOHar3lVl6rY_pwtvx4.jpg", "An open-world action RPG set in a dark fantasy universe.", 1, true, "The Witcher 3: Wild Hunt", "[0]", 39.99m, new DateOnly(2015, 5, 19) },
                    { 2, "https://res.cloudinary.com/dcbkiur84/image/upload/v1782508043/EGS_Cyberpunk2077_CDPROJEKTRED_S1_03_2560x1440-359e77d3cd0a40aebf3bbc130d14c5c7_lujx3a.jpg", 1, "https://res.cloudinary.com/dcbkiur84/image/upload/v1782508043/EGS_Cyberpunk2077_CDPROJEKTRED_S1_03_2560x1440-359e77d3cd0a40aebf3bbc130d14c5c7_lujx3a.jpg", "A futuristic open-world RPG set in Night City.", 1, true, "Cyberpunk 2077", "[0,1]", 59.99m, new DateOnly(2020, 12, 10) },
                    { 3, null, 2, "https://example.com/images/eldenring.jpg", "Explore the Lands Between in this epic action RPG.", 1, true, "Elden Ring", "[1,2]", 59.99m, new DateOnly(2022, 2, 25) },
                    { 4, "https://res.cloudinary.com/dcbkiur84/image/upload/v1782567890/apps.58691.13670972585585116.3e5032b0-0174-4e7d-b3ed-55f9306df6f1_nvylrq.jpg", 4, "https://res.cloudinary.com/dcbkiur84/image/upload/v1782567898/Cuphead_capa_sqc05m.png", "A run-and-gun indie game with hand-drawn 1930s cartoon art style.", 2, true, "Cuphead", "[0,2,3]", 19.99m, new DateOnly(2017, 9, 29) },
                    { 5, null, 5, "https://example.com/images/crash4.jpg", "A brand new Crash Bandicoot adventure with classic platforming action.", 3, true, "Crash Bandicoot 4: It's About Time", "[0,1,2,3]", 39.99m, new DateOnly(2020, 10, 2) },
                    { 6, "https://res.cloudinary.com/dcbkiur84/image/upload/v1782568319/gta-vi_mkgvim.jpg", 3, "https://res.cloudinary.com/dcbkiur84/image/upload/v1782568287/grand-theft-auto-vi_8stb_mbvxrc.jpg", "The next entry in the Grand Theft Auto series, coming to modern consoles.", 2, false, "GTA VI", "[1,2]", 69.99m, new DateOnly(2025, 9, 30) },
                    { 7, null, 6, "https://example.com/images/stardew.jpg", "A farming simulation RPG set in a charming rural world.", 1, true, "Stardew Valley", "[0,3]", 14.99m, new DateOnly(2016, 2, 26) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Games_CompanyId",
                table: "Games",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Games_GenreId",
                table: "Games",
                column: "GenreId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Games");

            migrationBuilder.DropTable(
                name: "Company");

            migrationBuilder.DropTable(
                name: "Genre");
        }
    }
}
