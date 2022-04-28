import './PaletaLista.css';
import {paletas} from 'mocks/paletas'
import { useState } from 'react';
import PaletaListaItem from 'components/PaletaListaItem/PaletaListaItem';

function PaletaLista() {

  const [paletaSelecionada, setPaletaSelecionada] = useState({});


  const adicionarItem = (paletaIndex) => {

    /*explain linha abaixo: indice da paleta:convertendo pra numero o indice NO vetor da peleta e 
    quantas vezes foi clicada---> ou seja quantas vezes a 
    paleta de indice [0] foi clicada, quantas 
    do indice [1] e assim por diante*/
    const paleta = {[paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) +1 };
    setPaletaSelecionada({...paletaSelecionada, ...paleta});//pega o que tem na variavel e manter e APENAS adiciona
    //console.log(paletaSelecionada);
  }
  const removerItem = (paletaIndex) => {
    const paleta = { [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) -1 }
    setPaletaSelecionada({...paletaSelecionada, ...paleta})
  };
  

    return (
      <div className="PaletaLista">{/*for (int i = 0;i<20;i++) ---tem que ser chave pois aqui é js---paleta pega uma paleta no paletas.js e o index serve pra mapear o indice e serve pro js */}
        {
          paletas.map((paleta,index)=>(
            <PaletaListaItem key={`PaletaListaItem-${index}`}
            paleta={paleta}
            quantidadeSelecionada={paletaSelecionada[index]}
            index={index} />
          ))
        }
      </div>
    )
  }
  
  export default PaletaLista;