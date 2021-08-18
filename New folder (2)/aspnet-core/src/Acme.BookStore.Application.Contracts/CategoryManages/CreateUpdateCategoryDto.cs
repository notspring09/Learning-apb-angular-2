using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Acme.BookStore.CategoryManagers
{
    public class CreateUpdateCategoryDto
    {
        [Required]
        [StringLength(128)]
        public string CategoryName { get; set; }

        [Required]
        public string CategoryCode { get; set; }

        public string Note { get; set; }
        
        public int CategoryRank { get; set; }

        public String CategoryEnglishName { get; set; }

        public String CategoryParent { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime PublishDate { get; set; } = DateTime.Now;
    }
}
