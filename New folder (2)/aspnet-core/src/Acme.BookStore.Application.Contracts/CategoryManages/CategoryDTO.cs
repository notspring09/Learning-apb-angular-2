﻿using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace Acme.BookStore.CategoryManagers
{
    public class CategoryDTO : AuditedEntityDto<Guid>
    {
        public string CategoryName { get; set; }

        public string CategoryCode { get; set; }

        public string Note { get; set; }

        public DateTime PublishDate { get; set; }
    }
}
