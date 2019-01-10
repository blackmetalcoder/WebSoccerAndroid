using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WebSoccerAndroid.Models;

namespace WebSoccerAndroid.Controllers
{
    public class tbLeagueStandingsController : ApiController
    {
        private dbAppEntities db = new dbAppEntities();

        // GET: api/tbLeagueStandings
        public IQueryable<tbLeagueStandings> GettbLeagueStandings(string League)
        {
            var T = from a in db.tbLeagueStandings
                    where a.Liga == League
                    select a;
            return T;
            //return db.tbLeagueStandings;
        }

        // GET: api/tbLeagueStandings/5
        [ResponseType(typeof(tbLeagueStandings))]
        public async Task<IHttpActionResult> GettbLeagueStandings(int id)
        {
            tbLeagueStandings tbLeagueStandings = await db.tbLeagueStandings.FindAsync(id);
            if (tbLeagueStandings == null)
            {
                return NotFound();
            }

            return Ok(tbLeagueStandings);
        }

        // PUT: api/tbLeagueStandings/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PuttbLeagueStandings(int id, tbLeagueStandings tbLeagueStandings)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tbLeagueStandings.id)
            {
                return BadRequest();
            }

            db.Entry(tbLeagueStandings).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tbLeagueStandingsExists(id))
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

        // POST: api/tbLeagueStandings
        [ResponseType(typeof(tbLeagueStandings))]
        public async Task<IHttpActionResult> PosttbLeagueStandings(tbLeagueStandings tbLeagueStandings)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tbLeagueStandings.Add(tbLeagueStandings);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = tbLeagueStandings.id }, tbLeagueStandings);
        }

        // DELETE: api/tbLeagueStandings/5
        [ResponseType(typeof(tbLeagueStandings))]
        public async Task<IHttpActionResult> DeletetbLeagueStandings(int id)
        {
            tbLeagueStandings tbLeagueStandings = await db.tbLeagueStandings.FindAsync(id);
            if (tbLeagueStandings == null)
            {
                return NotFound();
            }

            db.tbLeagueStandings.Remove(tbLeagueStandings);
            await db.SaveChangesAsync();

            return Ok(tbLeagueStandings);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tbLeagueStandingsExists(int id)
        {
            return db.tbLeagueStandings.Count(e => e.id == id) > 0;
        }
    }
}