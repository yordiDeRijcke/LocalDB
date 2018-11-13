namespace LocalDB.Core.Domain
{
    public class Item
    {

        #region Properties
        public int ItemId { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public int Amount { get; private set; }
        #endregion

        #region Constructor
        public Item(string name, string description, int amount)
        {
            Name = name;
            Description = description;
            Amount = amount;
        }
        #endregion
    }
}
