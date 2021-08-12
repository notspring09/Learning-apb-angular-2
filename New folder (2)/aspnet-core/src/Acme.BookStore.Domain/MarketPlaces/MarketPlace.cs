using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace Acme.BookStore.MarketPlaces
{
    public class MarketPlace : AuditedAggregateRoot<Guid>
    {
        public string Name { get; set; }

        public RaceType RaceType { get; set; }

        public GenderType Gender { get; set; }

        public DateTime PublishDate { get; set; }

        public float Price { get; set; }
    }
}
