import { Api } from "../helpers/Api";

const parseResponse = (response) => response.json();

const parseTransformLista = (response) =>//objetos transformados
  parseResponse(response).then((paletas) => paletas.map(transformPaleta));

const parseTransformItem = (response) => parseResponse(response).then(transformPaleta);

export const PaletaService = {
  getLista: () =>
    fetch(Api.paletaLista(), { method: "GET" }).then(parseTransformLista),

  getById: (id) =>
    fetch(Api.paletaById(id), { method: "GET" }).then(parseTransformItem),

  create: (paleta) =>
    fetch(Api.createPaleta(), { 
      method: "POST", 
      body:JSON.stringify(paleta), 
      mode:'cors', 
      headers:{'Content-Type':'application/json'}
    }).then(parseResponse),//pega o json do modal e transforma em texto pra create no banco

  updtateById: (id) =>
    fetch(Api.updatePaletaById(id), { method: "PUT" }).then(parseResponse),

  deleteById: (id) =>
    fetch(Api.deletePaletaById(id), { method: "DELETE" }).then(parseResponse),

};

const transformPaleta = (paleta) => {//faz a 'traducao' dos dados do back para o front exibir corretamente
  const [sabor, recheio] = paleta.sabor.split(" com ");//splitando em caso de ter recheio

  return {
    ...paleta,
    id: paleta._id,//no caso o underline é como o dado esta nomeado no mongo (todos no return), fazendo um *de* _BD_ *para* front (mas no caso inverso abaixo, que esta escrito quem recebe depois de onde onde vem)
    titulo: paleta.sabor,
    sabor,
    ...(recheio && { recheio }),
    possuiRecheio: Boolean(recheio),
  };
};




