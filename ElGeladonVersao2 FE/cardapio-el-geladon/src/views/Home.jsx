//todo componente de react é uma funcao
import './Home.css';
import PaletaLista from '../components/PaletaLista/PaletaLista';
import Navbar from 'components/Navbar/Navbar';
import AdicionaEditaPaletaModal from 'components/AdicionaEditaPaletaModal/AdicionaEditaPaletaModal';
import { useState } from "react";
import { ActionMode} from 'constants/index'
import DeletaPaletaModal from 'components/DeletaPaletaModal/DeletaPaletaModal';
import SacolaModal from 'components/SacolaModal/SacolaModal';
import {SacolaService} from '../services/SacolaService'


/*const Home = ()=>{
    return <div className="Home">Esse é o componente Home</div>
}*/ //forma 2 de fazer

function Home(){

    const [canShowAdicionaPaletaModal, setCanShowAdicionaPaletaModal] = useState(false);

    const [paletaParaAdicionar, setPaletaParaAdicionar] = useState();

    const [modoAtual,setModoAtual] = useState(ActionMode.NORMAL);

    const [paletaParaEditar, setPaletaParaEditar] = useState();
    const [paletaParaDeletar, setPaletaParaDeletar] = useState();

    const [paletaEditada, setPaletaEditada] = useState();

    const [paletaRemovida, setPaletaRemovida] = useState();

    const [canOpenBag, setCanOpenBag] = useState();

    const handleActions = (action) => {
        const novaAcao = modoAtual === action ? ActionMode.NORMAL : action;
        setModoAtual(novaAcao);
      }

    const handleDeletePaleta = (paletaToDelete) => {//quando deletar eu recebo a paleta a delatar e altera seu estado
        setPaletaParaDeletar(paletaToDelete);
    }
      
      
    const handleUpdatePaleta = (paletaToUpdate) => {//quando der update eu recebo a paleta a atualizar e altera seu estado
        setPaletaParaEditar(paletaToUpdate);
        setCanShowAdicionaPaletaModal(true);
    }

    const abrirSacola = async () => {
        const lista = JSON.parse(localStorage.getItem('sacola'));
        const sacola = lista.filter(i => i.quantidade > 0);
      
        await SacolaService.create(sacola)
      
        setCanOpenBag(true)
    }

    const handleCloseModal = () => {//altera o show do canShow e seta pra 0 todos os outros status
        setCanShowAdicionaPaletaModal(false);
        setPaletaParaAdicionar();
        setPaletaParaDeletar();
        setPaletaParaEditar();
        setModoAtual(ActionMode.NORMAL);
      }
      
      
      
    return (
        <div className="Home">
            <Navbar 
                mode={modoAtual}
                createPaleta={()=>setCanShowAdicionaPaletaModal(true)}
                deletePaleta={() => handleActions(ActionMode.DELETAR)}
                openBag={abrirSacola}
                updatePaleta={() =>  handleActions(ActionMode.ATUALIZAR)}/>
            
            <div className="Home__container">
                <PaletaLista 
                    mode={modoAtual} 
                    paletaCriada={paletaParaAdicionar}
                    paletaEditada={paletaEditada}
                    paletaRemovida={paletaRemovida}
                    deletePaleta={handleDeletePaleta}
                    updatePaleta={handleUpdatePaleta}
                />
                {
                    canShowAdicionaPaletaModal && 
                        <AdicionaEditaPaletaModal
                            mode={modoAtual}
                            paletaToUpdate={paletaParaEditar}
                            onUpdatePaleta={(paleta) => setPaletaEditada(paleta)}
                            closeModal={handleCloseModal}
                            onCreatePaleta={(paleta) => setPaletaParaAdicionar(paleta)}
                        />
                }
                
                {
                    paletaParaDeletar &&
                    <DeletaPaletaModal
                        paletaParaDeletar={paletaParaDeletar}
                        closeModal={handleCloseModal}
                        onDeletePaleta={(paleta) => setPaletaRemovida(paleta)}
                        />
                }
                {
                    canOpenBag &&
                    <SacolaModal closeModal={() => setCanOpenBag(false)} />
                }              
                
                {/* <AdicionaPaletaModal /> */}
            </div>
        </div>
    )
}

export default Home;