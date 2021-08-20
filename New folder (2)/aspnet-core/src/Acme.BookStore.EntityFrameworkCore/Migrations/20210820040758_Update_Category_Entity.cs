using Microsoft.EntityFrameworkCore.Migrations;

namespace Acme.BookStore.Migrations
{
    public partial class Update_Category_Entity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "parentid",
                table: "AppCategoryManages",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "parentid",
                table: "AppCategoryManages");
        }
    }
}
