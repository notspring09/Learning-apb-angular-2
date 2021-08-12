using Acme.BookStore.MarketPlaces;
using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace Acme.BookStore.Marketplace
{
    public class MarketplaceDTO : AuditedEntityDto<Guid>
    {
        //DTO classes are used to transfer data between the presentation layer and the application layer. See the Data Transfer Objects document for more details.
        public string Name { get; set; }

        public RaceType RaceType { get; set; }

        public GenderType Gender { get; set; }

        public DateTime PublishDate { get; set; }

        public float Price { get; set; }
    }
}
