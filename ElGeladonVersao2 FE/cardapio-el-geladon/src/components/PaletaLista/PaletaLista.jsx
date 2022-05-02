import './PaletaLista.css';
import { PaletaService } from 'services/PaletaService';
import { useState, useEffect } from 'react';//useEffect: renderiza algo mas faz algo depois, useState vai alterando seu estado
import PaletaListaItem from 'components/PaletaListaItem/PaletaListaItem';
import PaletaDetalhesModal from 'components/PaletaDetalhesModal/PaletaDetalhesModal';

function PaletaLista() {

  const [paletas, setPaletas] = useState([]);//vai vir da Api

  const [paletaSelecionada, setPaletaSelecionada] = useState({});

  const [paletaModal, setPaletaModal] = useState(false);

  const getLista = async ()=>{//substituto dos mock
    const response = await PaletaService.getLista();
    setPaletas(response);
  }

  const getPaletaById = async (paletaId) => {//const que ira pegar as peletas pelo ID ao inves de interar e buscar todas no back
    const response = await PaletaService.getById(paletaId);
    setPaletaModal(response);//como ele afeta somente o modal nao sera o setPaletas
  };


  const OnAdd = (paletaIndex) => {

    /*explain linha abaixo: indice da paleta:convertendo pra numero o indice NO vetor da peleta e 
    quantas vezes foi clicada---> ou seja quantas vezes a 
    paleta de indice [0] foi clicada, quantas 
    do indice [1] e assim por diante*/
    const paleta = {[paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) +1 };
    setPaletaSelecionada({...paletaSelecionada, ...paleta});//pega o que tem na variavel e manter e APENAS adiciona
    //console.log(paletaSelecionada);
  }

  const OnRemove = (paletaIndex) => {
    const paleta = { [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) -1 }
    setPaletaSelecionada({...paletaSelecionada, ...paleta})
  };
  
  useEffect(() => {getLista();
    }, []);
  

    return (
      <div className="PaletaLista">{/*for (int i = 0;i<20;i++) ---tem que ser chave pois aqui é js---paleta pega uma paleta no paletas.js e o index serve pra mapear o indice e serve pro js */}
        {
          paletas.map((paleta,index)=>(
            <PaletaListaItem 
              key={`PaletaListaItem-${index}`}
              paleta={paleta}
              quantidadeSelecionada={paletaSelecionada[index]}
              index={index}
              OnAdd={(index)=>{OnAdd(index)}}//tem que passar pra nao ficar em loop infinito de callback
              OnRemove={(index)=>{OnRemove(index)}} 
              clickItem={(paletaId) => getPaletaById(paletaId)}/>
          ))
        }

        {paletaModal && <PaletaDetalhesModal 
          paleta={paletaModal} 
          closeModal={() => setPaletaModal(false)} />}

      </div>
    )
  }
  
  export default PaletaLista;