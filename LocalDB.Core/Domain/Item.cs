namespace LocalDB.Core.Domain
{
    public class Item
    {
        #region Fields
        private int _stock;
        #endregion

        #region Properties
        public int ItemId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Stock {
            get {
                return _stock;
            }
            set {
                if (value >= 0)
                {
                    _stock = value;
                }
            }
        }
        #endregion

        #region Constructor
        public Item(string name, string description, int stock)
        {
            Name = name;
            Description = description;
            Stock = stock;
        }
        #endregion
    }
}
