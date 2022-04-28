//todo componente de react é uma funcao
import './Home.css';
import PaletaLista from '../components/PaletaLista/PaletaLista';
import Navbar from 'components/Navbar/Navbar';

/*const Home = ()=>{
    return <div className="Home">Esse é o componente Home</div>
}*/ //forma 2 de fazer

function Home(){
    return (
        <div className="Home">
            <Navbar/>
            <div className="Home__container">
                <PaletaLista />
            </div>
        </div>
    )
}

export default Home;