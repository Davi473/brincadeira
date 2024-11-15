import crypto from "crypto";
import CarteiraDAO from "./Repository";
import LancamentoService from "../Lancamento/Service";
import Media from "./Media";

export default class CarteiraService
{
    constructor (
        private repository: CarteiraDAO,
        private serviceLancamento: LancamentoService
    ) {}

    public async get (idUser: string)
    {
        const carteira = await this.repository.select({id_user: idUser});
        return carteira;
    }

    public async recalcularMedia (idUser: string, ativo: string) 
    {
        const lancamento = await this.serviceLancamento.getAtivo(idUser, ativo);
        const calculoMedia = new Media(lancamento, idUser, ativo);
        const [exist] = await this.repository.select({id_user: idUser, id_ativo: ativo});
        if (!exist) return await this.post(calculoMedia.newAtivo()); 
        return await this.put(calculoMedia.ativo());
    }

    private async post (carteira: any)
    {
        await this.repository.insert(carteira);
        return { message: "Adicionado com sucesso" };
    }

    private async put (carteira: any)
    {
        await this.repository.update(carteira);
        return { message: "Atualizado com sucesso" };
    }
}