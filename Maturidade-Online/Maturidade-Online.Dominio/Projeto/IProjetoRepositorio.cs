﻿using Maturidade_Online.Dominio.Abstrato;
using Maturidade_Online.Dominio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Maturidade_Online.Dominio
{
    public interface IProjetoRepositorio : IRepositorio<Projeto>
    {
        Projeto BuscarPorId(Projeto projeto);
    }
}
