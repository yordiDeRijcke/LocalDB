using LocalDB.Core.Domain;

namespace LocalDB.Data
{
    public class LocalDBDataInitializer
    {
        #region Fields
        private readonly ApplicationDbContext _dbContext;
        #endregion

        #region Constructor
        public LocalDBDataInitializer(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        #endregion

        #region Methods
        public void InitializeData()
        {
            _dbContext.Database.EnsureDeleted();

            if (_dbContext.Database.EnsureCreated())
            {
                Item ItemX = new Item("ItemX", "Dit is ItemX!", 0);
                _dbContext.Items.Add(ItemX);
                Item ItemY = new Item("ItemY", "Dit is ItemY!", 1);
                _dbContext.Items.Add(ItemY);
                Item ItemZ = new Item("ItemZ", "Dit is ItemZ!", 2);
                _dbContext.Items.Add(ItemZ);
                _dbContext.SaveChanges();
            }
        }
        #endregion
    }
}
