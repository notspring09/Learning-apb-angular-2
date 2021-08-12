using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Acme.BookStore.Marketplace
{
    public interface IMarketAppService :
        ICrudAppService< //Defines CRUD methods
            MarketplaceDTO, //Used to show books
            Guid, //Primary key of the book entity
            PagedAndSortedResultRequestDto, //Used for paging/sorting
            CreateUpdateMarketDto> //Used to create/update a book
    {

    }
}
