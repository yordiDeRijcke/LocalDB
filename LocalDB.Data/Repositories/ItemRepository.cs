using LocalDB.Core.Domain;
using LocalDB.Core.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace LocalDB.Data
{
    public class ItemRepository : IItemRepository
    {
        #region Fields
        private readonly ApplicationDbContext _dbContext;
        #endregion

        #region Constructor
        public ItemRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        #endregion

        #region Methods
        public void Add(Item itemId)
        {
            _dbContext.Items.Add(itemId);
        }

        public IEnumerable<Item> GetAll()
        {
            return _dbContext.Items.ToList();
        }

        public Item GetBy(int itemId)
        {
            return _dbContext.Items.Find(itemId);
        }

        public void Remove(Item itemId)
        {
            _dbContext.Items.Remove(itemId);
        }

        public void SaveChanges()
        {
            _dbContext.SaveChanges();
        }
        #endregion
    }
}
