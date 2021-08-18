using Acme.BookStore.CategoryManagers;
using Acme.BookStore.CategoryManages;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
namespace Acme.BookStore.CategoryManages
{
    public class CategoryAppService :
            CrudAppService<
            CategoryManage, //The Book entity
            CategoryDTO, //Used to show books
            Guid, //Primary key of the book entity
            PagedAndSortedResultRequestDto, //Used for paging/sorting
            CreateUpdateCategoryDto>, //Used to create/update a book
        ICategoryAppService //implement the IBookAppService
    {
        public CategoryAppService(IRepository<CategoryManage, Guid> repository)
            : base(repository)
        {

        }

    }

}
