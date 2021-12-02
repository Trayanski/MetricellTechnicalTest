using InterviewTest.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InterviewTest.Data
{
	public class SqliteDbContext : DbContext
	{
		public SqliteDbContext(DbContextOptions<SqliteDbContext> options):base(options)
		{
		}

		public DbSet<Employee> Employees { get; set; }
	}
}
