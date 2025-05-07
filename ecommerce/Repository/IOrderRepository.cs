using ecommerce.Models;

namespace ecommerce.Repository
{
    public interface IOrderRepository : IRepository<Order>
    {
        
        Order InsertOrder(Order order);
    }
}
