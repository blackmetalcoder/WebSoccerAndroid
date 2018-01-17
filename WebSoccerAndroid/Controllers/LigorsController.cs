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
    public class LigorsController : ApiController
    {
        private dbAppEntities db = new dbAppEntities();

        // GET: api/Ligors
        public IQueryable<Ligor> GetLigor()
        {
            var resultatIdag = from a in db.Ligor
                               orderby a.Country
                               select a;
            return resultatIdag;
            //return db.Ligor;
        }

        // GET: api/Ligors/5
        [ResponseType(typeof(Ligor))]
        public async Task<IHttpActionResult> GetLigor(int id)
        {
            Ligor ligor = await db.Ligor.FindAsync(id);
            if (ligor == null)
            {
                return NotFound();
            }

            return Ok(ligor);
        }

        // PUT: api/Ligors/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutLigor(int id, Ligor ligor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ligor.Id1)
            {
                return BadRequest();
            }

            db.Entry(ligor).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LigorExists(id))
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

        // POST: api/Ligors
        [ResponseType(typeof(Ligor))]
        public async Task<IHttpActionResult> PostLigor(Ligor ligor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Ligor.Add(ligor);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = ligor.Id1 }, ligor);
        }

        // DELETE: api/Ligors/5
        [ResponseType(typeof(Ligor))]
        public async Task<IHttpActionResult> DeleteLigor(int id)
        {
            Ligor ligor = await db.Ligor.FindAsync(id);
            if (ligor == null)
            {
                return NotFound();
            }

            db.Ligor.Remove(ligor);
            await db.SaveChangesAsync();

            return Ok(ligor);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LigorExists(int id)
        {
            return db.Ligor.Count(e => e.Id1 == id) > 0;
        }
    }
}