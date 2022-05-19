using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class SeedDataChannel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[] { new Guid("2f336ac6-a3b6-47b0-8c03-880ae99efab4"), "Canal dedicado a dotnet core", "DotNetCore" });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[] { new Guid("a4311051-4e76-4804-a024-80c4f0a877a8"), "Canal dedicado a Angular", "Angular" });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[] { new Guid("220ec638-f247-4da2-ae4a-1b7db7120a0f"), "Canal dedicado a Reactjs", "Reactjs" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("220ec638-f247-4da2-ae4a-1b7db7120a0f"));

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("2f336ac6-a3b6-47b0-8c03-880ae99efab4"));

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("a4311051-4e76-4804-a024-80c4f0a877a8"));
        }
    }
}
