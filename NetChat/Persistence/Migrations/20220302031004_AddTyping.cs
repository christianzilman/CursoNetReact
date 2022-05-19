using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddTyping : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("0a46ec8a-3e99-48d7-8cb7-5ee031c823f2"));

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("730bab63-b8fe-481b-afab-4c3f4615c7e5"));

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("95ca87da-7170-4146-8bd0-fd68dccd738b"));

            migrationBuilder.CreateTable(
                name: "TypingNotifications",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    ChannelId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypingNotifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TypingNotifications_AspNetUsers_Id",
                        column: x => x.Id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TypingNotifications_Channels_ChannelId",
                        column: x => x.ChannelId,
                        principalTable: "Channels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "ChannelType", "Description", "Name", "PrivateChannelId" },
                values: new object[] { new Guid("52d2a5f5-ca6b-48ad-b815-563d83c77a6f"), 0, "Canal dedicado a dotnet core", "DotNetCore", null });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "ChannelType", "Description", "Name", "PrivateChannelId" },
                values: new object[] { new Guid("5d5efc23-60a8-4eba-9dc7-c5b909d6c48e"), 0, "Canal dedicado a Angular", "Angular", null });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "ChannelType", "Description", "Name", "PrivateChannelId" },
                values: new object[] { new Guid("d4c26554-2ce8-426b-b382-4bceddcc914b"), 0, "Canal dedicado a Reactjs", "Reactjs", null });

            migrationBuilder.CreateIndex(
                name: "IX_TypingNotifications_ChannelId",
                table: "TypingNotifications",
                column: "ChannelId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TypingNotifications");

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("52d2a5f5-ca6b-48ad-b815-563d83c77a6f"));

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("5d5efc23-60a8-4eba-9dc7-c5b909d6c48e"));

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("d4c26554-2ce8-426b-b382-4bceddcc914b"));

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "ChannelType", "Description", "Name", "PrivateChannelId" },
                values: new object[] { new Guid("730bab63-b8fe-481b-afab-4c3f4615c7e5"), 0, "Canal dedicado a dotnet core", "DotNetCore", null });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "ChannelType", "Description", "Name", "PrivateChannelId" },
                values: new object[] { new Guid("95ca87da-7170-4146-8bd0-fd68dccd738b"), 0, "Canal dedicado a Angular", "Angular", null });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "ChannelType", "Description", "Name", "PrivateChannelId" },
                values: new object[] { new Guid("0a46ec8a-3e99-48d7-8cb7-5ee031c823f2"), 0, "Canal dedicado a Reactjs", "Reactjs", null });
        }
    }
}
