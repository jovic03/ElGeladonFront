import { Api } from "../helpers/Api";

const parseResponse = (response) => response.json();

export const PaletaService = {
  getLista: () =>
    fetch(Api.paletaLista(), { method: "GET" }).then(parseTransformLista),
  getById: (id) =>
    fetch(Api.paletaById(id), { method: "GET" }).then(parseResponse),
  create: () =>
    fetch(Api.createPaleta(), { method: "POST" }).then(parseResponse),
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

const parseTransformLista = (response) =>//objetos transformados
  parseResponse(response).then((paletas) => paletas.map(transformPaleta));


