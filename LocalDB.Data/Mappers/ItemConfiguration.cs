using LocalDB.Core.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LocalDB.Data.Mappers
{
    public class ItemConfiguration : IEntityTypeConfiguration<Item>
    {
        public void Configure(EntityTypeBuilder<Item> builder)
        {
            #region Table
            builder.ToTable("Item");
            #endregion

            #region Properties
            builder.HasKey(b => b.ItemId);
            builder.Property(b => b.Name).IsRequired().HasMaxLength(50);
            builder.Property(b => b.Description).HasMaxLength(150);
            builder.Property(b => b.Amount).IsRequired();
            #endregion
        }
    }
}
