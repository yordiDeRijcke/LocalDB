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
