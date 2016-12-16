﻿using Maturidade_Online.Dominio;
using Maturidade_Online.Dominio;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Maturidade_Online.Models
{
    public class ProjetoModel
    {

        public int? Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Nome { get; set; }

        [Required]
        public IEnumerable<Caracteristica> caracteristicas { get; set; }

        [Required]
        public IEnumerable<Subtopico> subtopicos { get; set; }

        public IEnumerable<Caracteristica> listaDeCaracteristicas { get; set; }
        public IEnumerable<Subtopico> listaDeSubtopicos { get; set; }
    }
}
