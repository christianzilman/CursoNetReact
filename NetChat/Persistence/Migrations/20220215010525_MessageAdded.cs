using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class MessageAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("1d2c9187-be02-44fa-9cec-198a0cf53fe1"));

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("5cce11ac-f659-4336-9a0d-a9c9741d3c84"));

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("76f77f45-e573-4736-9f1c-29477416c6c0"));

            migrationBuilder.AddColumn<int>(
                name: "ChannelType",
                table: "Channels",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Avatar",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Content = table.Column<string>(type: "TEXT", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    SenderId = table.Column<string>(type: "TEXT", nullable: true),
                    ChannelId = table.Column<Guid>(type: "TEXT", nullable: false),
                    MessageType = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Messages_AspNetUsers_SenderId",
                        column: x => x.SenderId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Messages_Channels_ChannelId",
                        column: x => x.ChannelId,
                        principalTable: "Channels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "ChannelType", "Description", "Name" },
                values: new object[] { new Guid("9f381b7f-47b3-4819-9124-695cd7fa2bb1"), 0, "Canal dedicado a dotnet core", "DotNetCore" });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "ChannelType", "Description", "Name" },
                values: new object[] { new Guid("23275419-34f7-460f-ba61-8a3309786f06"), 0, "Canal dedicado a Angular", "Angular" });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "ChannelType", "Description", "Name" },
                values: new object[] { new Guid("1ac44796-3d62-49a6-801d-b43ad6ff6ea7"), 0, "Canal dedicado a Reactjs", "Reactjs" });

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ChannelId",
                table: "Messages",
                column: "ChannelId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_SenderId",
                table: "Messages",
                column: "SenderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("1ac44796-3d62-49a6-801d-b43ad6ff6ea7"));

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("23275419-34f7-460f-ba61-8a3309786f06"));

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("9f381b7f-47b3-4819-9124-695cd7fa2bb1"));

            migrationBuilder.DropColumn(
                name: "ChannelType",
                table: "Channels");

            migrationBuilder.DropColumn(
                name: "Avatar",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[] { new Guid("1d2c9187-be02-44fa-9cec-198a0cf53fe1"), "Canal dedicado a dotnet core", "DotNetCore" });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[] { new Guid("5cce11ac-f659-4336-9a0d-a9c9741d3c84"), "Canal dedicado a Angular", "Angular" });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[] { new Guid("76f77f45-e573-4736-9f1c-29477416c6c0"), "Canal dedicado a Reactjs", "Reactjs" });
        }
    }
}
