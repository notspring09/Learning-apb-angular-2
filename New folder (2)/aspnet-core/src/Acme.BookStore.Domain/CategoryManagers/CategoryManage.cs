using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace Acme.BookStore.CategoryManagers
{
    public class CategoryManage : AuditedAggregateRoot<Guid>
    {
        public string CategoryCode { get; set; }

        public string CategoryName { get; set; }

        public string Note { get; set; }

        public int CategoryRank { get; set; }

        public String CategoryEnglishName { get; set; }

        public String CategoryParent { get; set; }

        public String parentid { get; set; }

        public DateTime PublishDate { get; set; }

    }
}
