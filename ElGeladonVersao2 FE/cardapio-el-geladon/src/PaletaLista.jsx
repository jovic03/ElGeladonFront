import './PaletaLista.css';
import {paletas} from 'mocks/paletas'
import { useState } from 'react';

function PaletaLista() {

  const [paletaSelecionada, setPaletaSelecionada] = useState({});

  
  const adicionarItem = (paletaIndex) => {

    /*explain linha abaixo: indice da paleta:convertendo pra numero o indice NO vetor da peleta e 
    quantas vezes foi clicada---> ou seja quantas vezes a 
    paleta de indice [0] foi clicada, quantas 
    do indice [1] e assim por diante*/
    const paleta = {[paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) +1 };
    setPaletaSelecionada({...paletaSelecionada, ...paleta});//pega o que tem na variavel e manter e APENAS adiciona
  }

    return (
      <div className="PaletaLista">
        {paletas.map((paleta,index) =>
            <div className="PaletaListaItem" key={`PaletaListaItem-${index}`}>
              <span className='PaletaListaItem__badge'>{paletaSelecionada[index] || 0}</span>
                    <div>
                      <div className="PaletaListaItem__titulo"> {paleta.titulo} </div>
                      <div className="PaletaListaItem__preco">R$ {paleta.preco.toFixed(2)}</div>
                      <div className="PaletaListaItem__descricao"> {paleta.descricao}  </div>
                      <div className="PaletaListaItem__acoes Acoes">
                        <button className="Acoes__adicionar Acoes__adicionar--preencher" 
                        onClick={() => adicionarItem(index)}>adicionar</button>
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