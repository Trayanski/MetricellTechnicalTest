using InterviewTest.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace InterviewTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ListController : ControllerBase
    {
        public ListController()
        {
        }

		[HttpPost, Route("incrementValues")]
		public async Task<ActionResult<IEnumerable<Employee>>> IncrementValues()
		{
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (SqlConnection sql = new SqlConnection(connectionStringBuilder.ConnectionString))
            using (SqlCommand cmd = new SqlCommand("IncrementValues", sql))
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                var response = new List<Employee>();
                await sql.OpenAsync();

                using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                {
					while (await reader.ReadAsync())
					{
                        response.Add(new Employee() {
                            Id = (int)reader["Id"],
                            Name = reader["Name"].ToString(),
                            Value = (int)reader["Value"],
                        });
					}
				}

                return response;
			}
		}
	}
}
