using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Acme.BookStore.CategoryManagers
{
    public interface ICategoryAppService :
        ICrudAppService< //Defines CRUD methods
            CategoryDTO, //Used to show books
            Guid, //Primary key of the book entity
            PagedAndSortedResultRequestDto, //Used for paging/sorting
            CreateUpdateCategoryDto> //Used to create/update a book
    {

    }
}
