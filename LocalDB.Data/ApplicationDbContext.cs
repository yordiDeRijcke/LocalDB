using LocalDB.Core.Domain;
using LocalDB.Data.Mappers;
using Microsoft.EntityFrameworkCore;

namespace LocalDB.Data
{
    public class ApplicationDbContext : DbContext
    {
        #region Properties
        public DbSet<Item> Items { get; set; }
        #endregion

        #region Constructor
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}
        #endregion

        #region Methods
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new ItemConfiguration());
        }
        #endregion
    }
}
