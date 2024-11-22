import RegisterService from "./Service";
import ApiHttp from "../../Config/ApiHttp/ApiHttp";

export default class RegisterController
{
    constructor (
        private api: ApiHttp,
        private service: RegisterService
    ) {
        this.api.register("post", "/register", async (req: any, res: any) =>
        {
            const { name, passoword } = req.body;
            try {
                const output = await this.service.post(name, passoword);
                res.json(output);
            } catch (e: any) {
                console.log(e.message);
                res.status(422).json({ message: e.message});
            }
        });
        /**
        * Em manutenção
        this.api.register("delete", "/register", async (req: any, res: any) =>
        {
            const { name, passoword } = req.body; 
            try {
                const output = await this.service.delete(name, passoword);
                res.json(output);
            } catch (e: any) {
                res.status(422).json({ message: e.message });
            }
        });
        */
        this.api.register("get", "/register", async (req: any, res: any) =>
        {
            const { name, passoword } = req.body; 
            try {
                const output = await this.service.get(name, passoword);
                res.json(output);
            } catch (e: any) {
                res.status(422).json({ message: e.message });
            }
        });
    }
}