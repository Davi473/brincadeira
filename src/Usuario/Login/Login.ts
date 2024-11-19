import LoginService from "./Service";
import ApiHttp from "../../Config/ApiHttp/ApiHttp";

export default class LoginController
{
    constructor (
        private api: ApiHttp,
        private service: LoginService
    ) {
        this.api.register("post", "/login", async (req: any, res: any) =>
        {
            const { name, password } = req.body;
            console.log(name, password);
            try {
                const output = await this.service.post(name, password);
                res.json(output);
            } catch (e: any) {
                res.status(422).json({ message: e.message});
            }
        });
    }
}