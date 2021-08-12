using Acme.BookStore.Marketplace;
using Acme.BookStore.MarketPlaces;
using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Acme.BookStore.Marketplaces
{
    public class MarketAppService :
        CrudAppService<
            MarketPlace, //The Marketplace entity
            MarketplaceDTO, //Used to show books
            Guid, //Primary key of the book entity
            PagedAndSortedResultRequestDto, //Used for paging/sorting
            CreateUpdateMarketDto>, //Used to create/update a book
        IMarketAppService //implement the IBookAppService
    {
        public MarketAppService(IRepository<MarketPlace, Guid> repository)
            : base(repository)
        {

        }
    }
}
