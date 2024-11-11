import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

export default class Hash
{
  public static async createHash(senha: string)
  {
    const sal = randomBytes(16).toString("hex");
    const senhaHash = scryptSync(senha, sal, 64).toString("hex");
    return `${sal}:${senhaHash}`;
  }

  public static async authentic(senha: string, _hash: string)
  {
    const [sal, hash] = _hash.split(":");
    const testeHash = scryptSync(senha, sal, 64);
    const hashReal = Buffer.from(hash, "hex");
    return timingSafeEqual(testeHash, hashReal);
  }
}