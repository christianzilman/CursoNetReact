using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddPrivateChannel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<string>(
                name: "PrivateChannelId",
                table: "Channels",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsOnline",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "PrivateChannelId",
                table: "Channels");

            migrationBuilder.DropColumn(
                name: "IsOnline",
                table: "AspNetUsers");

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
        }
    }
}
