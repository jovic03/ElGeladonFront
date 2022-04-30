import "./Overlay.css";

function Overlay({ children, overlayClick }) {//um overlay na tela (daqueles que destaca um conteudo em frente ao conteudo que esta sendo mostrado)
  return (
    <div className="Overlay" onClick={() => overlayClick()}>
      {children}
    </div>
  );
}

export default Overlay;