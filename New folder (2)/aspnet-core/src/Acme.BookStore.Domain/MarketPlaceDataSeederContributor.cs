using Acme.BookStore.CategoryManagers;
using Acme.BookStore.MarketPlaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;

namespace Acme.BookStore
{
    class MarketPlaceDataSeederContributor
    : IDataSeedContributor, ITransientDependency
    {
        private readonly IRepository<MarketPlace, Guid> _bookRepository;
        private readonly IRepository<CategoryManage, Guid> _categoryRepository;

        public MarketPlaceDataSeederContributor(IRepository<MarketPlace, Guid> marketRepository , IRepository<CategoryManage, Guid> categoryReposity)
        {
            _bookRepository = marketRepository;
            _categoryRepository = categoryReposity;
        }

        public async Task SeedAsync(DataSeedContext context)
        {
            if (await _bookRepository.GetCountAsync() <= 0)
            {
                await _bookRepository.InsertAsync(
                    new MarketPlace
                    {
                        Name = "NO NAME",
                        RaceType = RaceType.Elf,
                        Gender = GenderType.Female,
                        PublishDate = new DateTime(1949, 6, 8),
                        Price = 19.84f
                    },
                    autoSave: true
                );

                await _bookRepository.InsertAsync(
                    new MarketPlace
                    {
                        Name = "The NightMare",
                        RaceType = RaceType.Demon,
                        Gender = GenderType.Male,
                        PublishDate = new DateTime(1995, 9, 27),
                        Price = 42.0f
                    },
                    autoSave: true
                );


              
            }

            //for category
            if (await _categoryRepository.GetCountAsync() <= 0)
            {
                await _categoryRepository.InsertAsync(
                                    new CategoryManage
                                    {
                                        CategoryName = "Trâu - bò Cân hàng",
                                        CategoryCode = "DODONG_TRAU_BO_CAN",
                                        PublishDate = new DateTime(2021, 9, 27, 11, 12, 0)
                                    },
                                    autoSave: true
                                );

                await _categoryRepository.InsertAsync(
                    new CategoryManage
                    {
                        CategoryName = "Trâu - bò",
                        CategoryCode = "DODONG_TRAU_BO",
                        PublishDate = new DateTime(2021, 9, 27, 11, 12, 0)
                    },
                    autoSave: true
                );
            }
        }
    }
}