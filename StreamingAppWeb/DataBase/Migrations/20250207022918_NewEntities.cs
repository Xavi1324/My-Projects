using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataBase.Migrations
{
    /// <inheritdoc />
    public partial class NewEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Nombre",
                table: "Productoras",
                newName: "NombreProductora");

            migrationBuilder.RenameColumn(
                name: "Nombre",
                table: "Generos",
                newName: "NombreGenero");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NombreProductora",
                table: "Productoras",
                newName: "Nombre");

            migrationBuilder.RenameColumn(
                name: "NombreGenero",
                table: "Generos",
                newName: "Nombre");
        }
    }
}
