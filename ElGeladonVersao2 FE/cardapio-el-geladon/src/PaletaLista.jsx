import './PaletaLista.css';
import {paletas} from 'mocks/paletas'
import { useState } from 'react';

function PaletaLista() {

  const [paletaSelecionada, setPaletaSelecionada] = useState({});

  /*
  const adicionarItem = (paletaIndex) => {
    const paleta = { [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) +1 }
    setPaletaSelecionada({ ...paletaSelecionada, ...paleta});
  }*/

    return (
      <div className="PaletaLista">{/*tem que ser chave pois aqui é js---paleta pega uma paleta no paletas.js e o index serve pra mapear o indice e serve pro js */}
      {/* for (int i = 0;i<20;i++): */}
        {paletas.map((paleta,index) =>
            <div className="PaletaListaItem" key={`PaletaListaItem-${index}`}>{/* key serve para atribuir a cada elemnto um valor unico */}
                    <div>
                      <div className="PaletaListaItem__titulo"> {paleta.titulo} </div>
                      <div className="PaletaListaItem__preco">R$ {paleta.preco.toFixed(2)}</div>
                      <div className="PaletaListaItem__descricao"> {paleta.descricao}  </div>
                      <div className="PaletaListaItem__acoes Acoes">
                        <button className="Acoes__adicionar Acoes__adicionar--preencher">adicionar</button>
                      </div>
                    </div>
                    <img className="PaletaListaItem__foto" 
                    src={paleta.foto} 
                    alt={`Paleta de ${paleta.sabor}`} />
            </div>
        )}

      </div>
    )
  }
  
  export default PaletaLista;