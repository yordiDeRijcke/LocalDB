using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using LocalDB.Models;
using LocalDB.Core.Repositories;
using System.Collections.Generic;
using LocalDB.Core.Domain;

namespace LocalDB.Controllers
{
    public class ItemController : Controller
    {
        public class changedItem
        {
            public int itemId { get; set; }
            public int stock { get; set; }
        }

        #region Fields
        private readonly IItemRepository _itemRepository;
        #endregion

        #region Constructor
        public ItemController(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }
        #endregion

        #region Methods
        public IActionResult Index()
        {
            IEnumerable<Item> items = _itemRepository.GetAll();
            return View(items);
        }

        [HttpPost]
        public IActionResult UpdateStock(IEnumerable<changedItem> changedItems)
        {
            Item itemToChange;

            foreach (changedItem changedItem in changedItems)
            {
                itemToChange = _itemRepository.GetBy(changedItem.itemId);
                itemToChange.Stock = changedItem.stock;
            }

            _itemRepository.SaveChanges();
            return RedirectToAction("Index");
        }

        public IActionResult Details(int id)
        {
            Item item = _itemRepository.GetBy(id);
            return View(item);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        #endregion
    }
}
