import './PaletaLista.css';
import { PaletaService } from 'services/PaletaService';
import { useState, useEffect , useCallback } from 'react';//useEffect: renderiza algo mas faz algo depois, useState vai alterando seu estado---useCalback
import PaletaListaItem from 'components/PaletaListaItem/PaletaListaItem';
import PaletaDetalhesModal from 'components/PaletaDetalhesModal/PaletaDetalhesModal';
import { ActionMode } from "../../constants/index";
import {matchByText} from '../../helpers/utils'

function PaletaLista({ paletaCriada , mode, updatePaleta,deletePaleta, paletaEditada,paletaRemovida }) {

  const selecionadas = JSON.parse(localStorage.getItem('selecionadas')) ?? {};

  const [paletas, setPaletas] = useState([]);//vai vir da Api

  const [paletasFiltradas, setPaletasFiltradas] = useState([]);//hook do filtro

  const [paletaSelecionada, setPaletaSelecionada] = useState(selecionadas);

  const [paletaModal, setPaletaModal] = useState(false);

  const getLista = async ()=>{//substituto dos mock
    const response = await PaletaService.getLista();
    setPaletas(response);
  }

  const getPaletaById = async (paletaId) => {//const que ira pegar as peletas pelo ID ao inves de interar e buscar todas no back
    const response = await PaletaService.getById(paletaId);

    const mapper = {
      [ActionMode.NORMAL]: () => setPaletaModal(response),
      [ActionMode.ATUALIZAR]: () => updatePaleta(response),
      [ActionMode.DELETAR]: () => deletePaleta(response),
    };

    mapper[mode]();

    //setPaletaModal(response);//como ele afeta somente o modal nao sera o setPaletas--como agora vem do moder nao precisa mais dele
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

  const setSelecionadas = useCallback(() => {//vai manter os dados armazenados na memoria, entao quando der f5 o que tiver sido selcionado ou alterado permanece
    if(!paletas.length) return

    const entries = Object.entries(paletaSelecionada);
    const sacola = entries.map(arr => ({
      paletaId: paletas[arr[0]].id,
      quantidade: arr[1]
    }))

    localStorage.setItem('sacola', JSON.stringify(sacola))
    localStorage.setItem('selecionadas', JSON.stringify(paletaSelecionada))
  }, [ paletaSelecionada, paletas ])

  const OnRemove = (paletaIndex) => {
    const paleta = { [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) -1 }
    setPaletaSelecionada({...paletaSelecionada, ...paleta})
  };

  const adicionaPaletaNaLista = useCallback((paleta) => {//quando adiciona algo ele atualiza a pagina
    const lista = [...paletas, paleta];
    setPaletas(lista);
    },
    [paletas]
  );

  const filtroPorTitulo = ({target}) => {
    const lista = [...paletas].filter(({titulo}) => matchByText(titulo, target.value))
    setPaletasFiltradas(lista);
  }
  

  useEffect(() => {
    setSelecionadas();
  }, [ setSelecionadas, paletaSelecionada ]);

  useEffect(() => {//busca os dados bo backend
    if (paletaCriada && !paletas.map(({ id }) => id).includes(paletaCriada.id)
    ){
      adicionaPaletaNaLista(paletaCriada);
    }
    setPaletasFiltradas(paletas)
  },[adicionaPaletaNaLista, paletaCriada , paletas]);
  
  
  useEffect(() => {getLista();
    }, [paletaEditada, paletaRemovida]);
  

    return (
      <div className="PaletaLista-Wrapper">
        <input
          className="PaletaLista-filtro"
          onChange={filtroPorTitulo}
          placeholder="Busque uma paleta pelo título" />

        <div className="PaletaLista">{/*for (int i = 0;i<20;i++) ---tem que ser chave pois aqui é js---paleta pega uma paleta no paletas.js e o index serve pra mapear o indice e serve pro js */}
          {
            paletasFiltradas.map((paleta,index)=>(
              <PaletaListaItem 
                mode={mode}
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
      </div>
    )
  }
  
  export default PaletaLista;