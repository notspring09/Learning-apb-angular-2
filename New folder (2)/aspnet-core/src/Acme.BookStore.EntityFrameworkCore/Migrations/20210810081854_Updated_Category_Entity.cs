using Microsoft.EntityFrameworkCore.Migrations;

namespace Acme.BookStore.Migrations
{
    public partial class Updated_Category_Entity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CategoryCode",
                table: "AppCategoryManages",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "AppCategoryManages",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppCategoryManages_CategoryCode",
                table: "AppCategoryManages",
                column: "CategoryCode",
                unique: true,
                filter: "[CategoryCode] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AppCategoryManages_CategoryCode",
                table: "AppCategoryManages");

            migrationBuilder.DropColumn(
                name: "Note",
                table: "AppCategoryManages");

            migrationBuilder.AlterColumn<string>(
                name: "CategoryCode",
                table: "AppCategoryManages",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);
        }
    }
}
