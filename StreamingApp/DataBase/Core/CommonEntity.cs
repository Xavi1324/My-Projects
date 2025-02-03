using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DataBase.Core
{
    public abstract class CommonEntity : BaseEntity
    {
        public required string Nombre { get; set; }
    }
}
