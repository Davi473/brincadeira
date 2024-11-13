import crypto from "crypto";
import CarteiraDAO from "./Repository";
import AtivoService from "../Ativo/Service";
import LancamentoService from "../Lancamento/Service";
import Media from "./Media";

export default class CarteiraService
{
    constructor (
        private repository: CarteiraDAO,
        private serviceAtivo: AtivoService,
        private serviceLancamento: LancamentoService
    ) {}

    public async post (idUser: string, ativo: string)
    {
        const lancamento = await this.serviceLancamento.getAtivo(idUser, ativo);
        const calculoMedia = new Media(lancamento);
        const carteira = {
            id: crypto.randomUUID(),
            id_ativo: ativo,
            id_user: idUser,
            quantidade: calculoMedia.getQuantidade(),
            media: calculoMedia.getMedia()
        }
        this.repository.insert(carteira);
    }

    public async get ()
    {
       
    }

    public async put ()
    {
  
    }
}