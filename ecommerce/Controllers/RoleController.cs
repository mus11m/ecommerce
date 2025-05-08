using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ecommerce.Models;

namespace ecommerce.Controllers
{
    // Only users passing the "RequireAdmin" policy may access these actions
    [Authorize(Policy = "RequireAdmin")]
    public class RoleController : Controller
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public RoleController(
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        // GET: /Role/Index
        // Shows all existing roles
        [HttpGet]
        public IActionResult Index()
        {
            var roles = _roleManager.Roles;
            return View(roles);
        }

        // POST: /Role/CreateRoles
        // Creates the "Admin" and "User" roles if they don't already exist
        [HttpPost]
        public async Task<IActionResult> CreateRoles()
        {
            var roleNames = new[] { "Admin", "User" };

            foreach (var roleName in roleNames)
            {
                if (!await _roleManager.RoleExistsAsync(roleName))
                {
                    var result = await _roleManager.CreateAsync(new IdentityRole(roleName));
                    if (!result.Succeeded)
                    {
                        foreach (var error in result.Errors)
                        {
                            ModelState.AddModelError("", error.Description);
                        }
                    }
                }
            }

            return RedirectToAction(nameof(Index));
        }
    }
}
