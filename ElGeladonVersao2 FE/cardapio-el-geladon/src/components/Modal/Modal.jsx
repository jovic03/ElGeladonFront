import './Modal.css'
import Overlay from "components/Overlay/Overlay";

function Modal({ children, closeModal }) {//funcao que vai exibir conteudo dentro dele + vai utilizar o Overlay + como clica fora de um objeto pra fechar o Modal
  const handleClick = (e, canClose) => {//'e' é o nome do evento, que vai impedir a propagacao para os Listeners da pagina
    e.stopPropagation();//impede que o evento seja 'propagado' (exibido)
    if (canClose) closeModal();
  };

  return (//o retorno do conteudo acima, no caso fecha o modal se o teste der ok
    <Overlay overlayClick={closeModal}>
      <div className="Modal" onClick={handleClick}>
        <span className="Modal__close" onClick={(e) => handleClick(e, true)}>
          +
        </span>
        <div className="Modal__body">{children}</div>
      </div>
    </Overlay>
  );
}

export default Modal;