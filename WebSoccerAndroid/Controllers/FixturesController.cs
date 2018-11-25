using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using System.Web.UI.WebControls;
using WebSoccerAndroid.Models;

namespace WebSoccerAndroid.Controllers
{
    public class FixturesController : ApiController
    {
        const string apiKey = "e9ecf8f219364df0ab6f292c105584ff";
        private static async Task<dynamic> getDataFromService(string queryString)
        {
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(queryString);
                var response = await request.GetResponseAsync().ConfigureAwait(false);
                var stream = response.GetResponseStream();
                var streamReader = new StreamReader(stream);
                string responseText = streamReader.ReadToEnd();
                dynamic data = JsonConvert.DeserializeObject(responseText);
                return data;
            }
            catch (Exception)
            {
                return null;
            }

        }
        private dbAppEntities db = new dbAppEntities();

        // GET: api/Fixtures
        public IQueryable<Fixtures> GetFixtures(DateTime StartDatum)
        {
           
            DateTime datum = StartDatum;
            datum = StartDatum.AddDays(1);
            var resultatIdag = from a in db.Fixtures
                               where a.Date >= StartDatum
                               where a.Date <= datum
                               orderby a.League
                               select a;
            return resultatIdag;
        }
        /*[EnableCors(origins: "http://resultatservice.azurewebsites.net", headers: "*", methods: "*")]
        public async static Task<string> GetFixtures(string Datum)
        {
            try
            {
                var client = new HttpClient();
                var uri = new Uri("http://resultatservice.azurewebsites.net/api/Fixtures?StartDatum=" + Datum);
                var Response = await client.GetAsync(uri);
                var statusCode = Response.StatusCode;
                Response.EnsureSuccessStatusCode();
                var ResponseText = await Response.Content.ReadAsStringAsync();
                return ResponseText;
            }

            catch (Exception ex)
            {
                return "fel";
            }
        }
*/
        // GET: api/Fixtures/5
        [ResponseType(typeof(Fixtures))]
        public async Task<IHttpActionResult> GetFixtures(int id)
        {
            Fixtures fixtures = await db.Fixtures.FindAsync(id);
            if (fixtures == null)
            {
                return NotFound();
            }

            return Ok(fixtures);
        }

        // PUT: api/Fixtures/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutFixtures(int id, Fixtures fixtures)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != fixtures.Idnr)
            {
                return BadRequest();
            }

            db.Entry(fixtures).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FixturesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Fixtures
        [ResponseType(typeof(Fixtures))]
        public async Task<IHttpActionResult> PostFixtures(Fixtures fixtures)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Fixtures.Add(fixtures);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = fixtures.Idnr }, fixtures);
        }

        // DELETE: api/Fixtures/5
        [ResponseType(typeof(Fixtures))]
        public async Task<IHttpActionResult> DeleteFixtures(int id)
        {
            Fixtures fixtures = await db.Fixtures.FindAsync(id);
            if (fixtures == null)
            {
                return NotFound();
            }

            db.Fixtures.Remove(fixtures);
            await db.SaveChangesAsync();

            return Ok(fixtures);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FixturesExists(int id)
        {
            return db.Fixtures.Count(e => e.Idnr == id) > 0;
        }
    }
}