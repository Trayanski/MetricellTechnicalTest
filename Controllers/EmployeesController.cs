using InterviewTest.Data;
using InterviewTest.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InterviewTest.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class EmployeesController : ControllerBase
	{
		private readonly SqliteDbContext _context;

		public EmployeesController(SqliteDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
		{
			return await _context.Employees.ToListAsync();
		}

		// GET: api/Employee/5
		[HttpGet("{id}")]
		public async Task<ActionResult<Employee>> GetEmployee(int id)
		{
			Employee employee = await _context.Employees.FindAsync(id);
			if (employee == null)
			{
				return NotFound();
			}

			return employee;
		}

		[HttpPut("{id}")]
		public async Task<ActionResult> PutEmployee(int id, Employee employee)
		{
			employee.Id = id;

			_context.Entry(employee).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!EmployeeExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return NoContent();
		}

		[HttpPost]
		public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
		{
			_context.Employees.Add(employee);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<Employee>> DeleteEmployee(int id)
		{
			Employee employee = await _context.Employees.FindAsync(id);
			if (employee == null)
			{
				return NotFound();
			}

			_context.Employees.Remove(employee);
			await _context.SaveChangesAsync();

			return employee;
		}

		#region Helpers
		
		private bool EmployeeExists(int id)
		{
			return _context.Employees.Any(e => e.Id == id);
		}

		#endregion
	}
}
