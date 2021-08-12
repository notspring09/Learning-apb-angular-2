using Acme.BookStore.MarketPlaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Acme.BookStore.Marketplace
{
    public class CreateUpdateMarketDto
    {
        //        This DTO class is used to get book information from the user interface while creating or updating a book.
        //It defines data annotation attributes(like[Required]) to define validations for the properties.DTOs are automatically validated by the ABP framework.
        
        [Required]
        [StringLength(128)]
        public string Name { get; set; }

        [Required]
        public RaceType RaceType { get; set; } = RaceType.Human;

        [Required]
        public GenderType Gender { get; set; } = GenderType.Male;

        [Required]
        [DataType(DataType.Date)]
        public DateTime PublishDate { get; set; } = DateTime.Now;

        [Required]
        public float Price { get; set; }
    }
}
