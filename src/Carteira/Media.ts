
export default class Media 
{
    private average: number = 0;
    private quantidade: number = 0;
    private valorTotal: number = 0;

    constructor(
        private lancamentos: any[],
        private id_ativo: string, 
        private id_user: string
    ) {
        this.averageCalculation();
    }

    public newAtivo ()
    {
        return {
            id: crypto.randomUUID(),
            id_ativo: this.id_ativo,
            id_user: this.id_user,
            quantidade: this.quantidade,
            media: this.average
        };
    }

    public ativo ()
    {
        return {
            id_ativo: this.id_ativo,
            id_user: this.id_user,
            quantidade: this.quantidade,
            media: this.average
        };
    }

    private averageCalculation ()
    {
        this.lancamentos.forEach((lancamento) => 
        {
            this.valorTotal = this.buy(lancamento.compra, 
                this.valorTotal, lancamento.preco);
            this.quantidade = this.buy(lancamento.compra, 
                this.quantidade, lancamento.quantidade);
            this.amountZero();
        });
        if (this.quantidade === 0) this.average = 0;
        if(this.quantidade < 0) this.average = this.valorTotal / this.quantidade;
    }

    private amountZero ()
    {
        if (this.valorTotal > 0 || this.quantidade > 0)
        {
            this.valorTotal = 0;
            this.quantidade = 0;
        }
    }

    private buy (buy: boolean, valueSum:  number, value: number)
    {
        switch (buy)
        {
            case true: return valueSum + value;
            case false: return valueSum - value;
        }
    }
}