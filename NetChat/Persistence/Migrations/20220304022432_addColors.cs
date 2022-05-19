using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class addColors : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<string>(
                name: "PrimaryAppColor",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SecondaryAppColor",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "ChannelType", "Description", "Name", "PrivateChannelId" },
                values: new object[] { new Guid("e16a57c9-1875-48df-a580-d0d448772301"), 0, "Canal dedicado a dotnet core", "DotNetCore", null });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "ChannelType", "Description", "Name", "PrivateChannelId" },
                values: new object[] { new Guid("d2bf49fb-a3cc-4d52-bc53-80e72eaf3aed"), 0, "Canal dedicado a Angular", "Angular", null });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "ChannelType", "Description", "Name", "PrivateChannelId" },
                values: new object[] { new Guid("2fbf1e9f-2f4f-41ab-8a5f-d0822cacb046"), 0, "Canal dedicado a Reactjs", "Reactjs", null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("2fbf1e9f-2f4f-41ab-8a5f-d0822cacb046"));

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("d2bf49fb-a3cc-4d52-bc53-80e72eaf3aed"));

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("e16a57c9-1875-48df-a580-d0d448772301"));

            migrationBuilder.DropColumn(
                name: "PrimaryAppColor",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SecondaryAppColor",
                table: "AspNetUsers");

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
        }
    }
}
