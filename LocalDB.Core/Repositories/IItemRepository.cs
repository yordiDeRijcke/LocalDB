using LocalDB.Core.Domain;
using System.Collections.Generic;

namespace LocalDB.Core.Repositories
{
    public interface IItemRepository
    {
        #region Methods
        Item GetBy(int itemId);
        IEnumerable<Item> GetAll();
        void Add(Item item);
        void Remove(Item item);
        void SaveChanges();
        #endregion
    }
}
