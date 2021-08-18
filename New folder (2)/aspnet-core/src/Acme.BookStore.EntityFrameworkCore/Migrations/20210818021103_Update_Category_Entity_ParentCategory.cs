using Microsoft.EntityFrameworkCore.Migrations;

namespace Acme.BookStore.Migrations
{
    public partial class Update_Category_Entity_ParentCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CategoryEnglishName",
                table: "AppCategoryManages",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CategoryParent",
                table: "AppCategoryManages",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CategoryRank",
                table: "AppCategoryManages",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryEnglishName",
                table: "AppCategoryManages");

            migrationBuilder.DropColumn(
                name: "CategoryParent",
                table: "AppCategoryManages");

            migrationBuilder.DropColumn(
                name: "CategoryRank",
                table: "AppCategoryManages");
        }
    }
}
