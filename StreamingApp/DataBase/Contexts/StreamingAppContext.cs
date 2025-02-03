using DataBase.Entities.Genero;
using DataBase.Entities.Productora;
using DataBase.Entities.Relaciones;
using DataBase.Entities.Series;
using Microsoft.EntityFrameworkCore;

namespace DataBase.Contexts
{
    public class StreamingAppContext : DbContext
    {
        public StreamingAppContext(DbContextOptions<StreamingAppContext> options) : base(options) { }

        #region "DbSets"
        public DbSet<Generos> Generos { get; set; }
        public DbSet<Productoras> Productoras { get; set; }
        public DbSet<Serie> Series { get; set; }
        public DbSet<SerieGenero> SerieGenero { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //fluent api

            #region Tablas
            modelBuilder.Entity<Serie>().ToTable("Series");
            modelBuilder.Entity<Productoras>().ToTable("Productoras");
            modelBuilder.Entity<Generos>().ToTable("Generos");
            modelBuilder.Entity<SerieGenero>().ToTable("SerieGenero");
            #endregion

            #region PK
            modelBuilder.Entity<Serie>().HasKey(s => s.Id);
            modelBuilder.Entity<Productoras>().HasKey(p => p.Id);
            modelBuilder.Entity<Generos>().HasKey(g => g.Id);
            modelBuilder.Entity<SerieGenero>().HasKey(sg => new { sg.IdSerie, sg.IdGenero });
            #endregion

            #region Relaciones
            modelBuilder.Entity<Productoras>()
                .HasMany<Serie>(p => p.Series)
                .WithOne(s => s.Productora)
                .HasForeignKey(s => s.IdProductora)
                .OnDelete(DeleteBehavior.SetNull); // Poner en la vista no disponible cuando se elimina la productora de una serie

            modelBuilder.Entity<SerieGenero>()
                .HasOne<Serie>(sg => sg.Serie)
                .WithMany(s => s.SerieGeneros)
                .HasForeignKey(sg => sg.IdSerie)
                .OnDelete(DeleteBehavior.Cascade); // Se eliminarán las relaciones en SerieGenero al eliminar una serie

            modelBuilder.Entity<SerieGenero>()
                .HasOne(sg => sg.Genero)
                .WithMany(g => g.SerieGeneros)
                .HasForeignKey(sg => sg.IdGenero)
                .OnDelete(DeleteBehavior.Restrict); // No eliminamos los géneros si se elimina la serie
            #endregion

            #region Configurations

            #region Serie
            modelBuilder.Entity<Serie>().Property(s => s.Titulo).HasMaxLength(150).IsRequired();
            modelBuilder.Entity<Serie>().Property(s => s.PortadaUrl).IsRequired();
            modelBuilder.Entity<Serie>().Property(s => s.VideoUrl).IsRequired();
            #endregion

            #region Productora
            modelBuilder.Entity<Productoras>().Property(p => p.Nombre).HasMaxLength(150).IsRequired();
            #endregion

            #region Genero
            modelBuilder.Entity<Generos>().Property(g => g.Nombre).HasMaxLength(150).IsRequired();
            #endregion

            #endregion

            base.OnModelCreating(modelBuilder);
        }
    }
}
