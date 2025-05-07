using ecommerce.Models;

namespace ecommerce.Repository
{
    public interface ICategoryRepository : IRepository<Category>
    {
        List<Category> GetAll(string include = null);

        public List<Product> GetAllProductsInCategory(int CategoryId);

        Category Get(int id, string include);

        Category GetCategoryByName(string name);

        List<Category> Get(Func<Category, bool> where);

        void Insert(Category item);

        
        void TransferAllProductsToAnotherCategory(int OldCategoryId, int NewCategoryId);

        void DeleteAllProductsInCategory(int CategoryId);

        void Update(Category item);

        void Delete(int id);

        void Save();

        public List<Category> GetPageList(int skipstep, int pageSize);
    }
}
