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
                Item ItemX = new Item("124cc Takegawa DOHC 4klepper", "Deze 124cc Takegawa DOHC 4klepper kit geeft u 17pk. Dit zorgt voor een goede trekkracht in zijn 5 versnellingen!", 2);
                _dbContext.Items.Add(ItemX);
                Item ItemY = new Item("Aline", "De dees moogt ge al stekken voor €5! 1 + 1 gratis!!!", 69);
                _dbContext.Items.Add(ItemY);
                Item ItemZ = new Item("Dell XPS15", "Deze laptop is voorzien van een i7 quad-core hyperthreaded CPU in combinatie met 16GB DDR4 RAM en een GTX 1050M!", 2);
                _dbContext.Items.Add(ItemZ);
                Item ItemD = new Item("XL Pak Pall Mall", "30 safkes in een pakske hoogkwalitatieve Pall Mall! Proef dat nu!", 0);
                _dbContext.Items.Add(ItemD);
                _dbContext.SaveChanges();
            }
        }
        #endregion
    }
}
