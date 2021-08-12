using Acme.BookStore.Marketplace;
using Acme.BookStore.CategoryManages;
using Acme.BookStore.MarketPlaces;
using AutoMapper;
using Volo.Abp.Application.Dtos;
using Acme.BookStore.CategoryManagers;

namespace Acme.BookStore

{
    public class BookStoreApplicationAutoMapperProfile : Profile
    {
        public BookStoreApplicationAutoMapperProfile()
        {
            /* You can configure your AutoMapper mapping configuration here.
             * Alternatively, you can split your mapping configurations
             * into multiple profile classes for a better organization. */
            /*It will be needed to map Book entities to BookDto objects while returning books to 
            * the presentation layer. AutoMapper library can automate this convers
            * ion when you define the proper mapping. The startup template comes with AutoMapper pre-configured. 
            * So, you can just define the mapping in the BookStoreApplicationAutoMapperProfile class in the Acme.BookStore.Application project:*/
            CreateMap<MarketPlace, MarketplaceDTO>();
            //Just like done for the BookDto above, we should define the mapping from the CreateUpdateBookDto object to the Book entity. The final class will be like shown below:
            CreateMap<CreateUpdateMarketDto, MarketPlace>();

            //Category
            CreateMap<CategoryManage, CategoryDTO>();
            CreateMap<CreateUpdateCategoryDto, CategoryManage>();
        }
}
}
