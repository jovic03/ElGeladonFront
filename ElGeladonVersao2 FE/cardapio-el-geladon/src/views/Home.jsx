//todo componente de react é uma funcao
import './Home.css';
import PaletaLista from '../components/PaletaLista/PaletaLista';
import Navbar from 'components/Navbar/Navbar';
import AdicionaPaletaModal from 'components/AdicionaPaletaModal/AdicionaPaletaModal';
import { useState } from "react";


/*const Home = ()=>{
    return <div className="Home">Esse é o componente Home</div>
}*/ //forma 2 de fazer

function Home(){

    const [canShowAdicionaPaletaModal, setCanShowAdicionaPaletaModal] = useState(false);

    return (
        <div className="Home">
            <Navbar createPaleta={()=>setCanShowAdicionaPaletaModal(true)}/>
            <div className="Home__container">
                <PaletaLista />
                {
                    canShowAdicionaPaletaModal && <AdicionaPaletaModal 
                        closeModal={()=>setCanShowAdicionaPaletaModal(false)}/>
                }
                {/* <AdicionaPaletaModal /> */}
            </div>
        </div>
    )
}

export default Home;