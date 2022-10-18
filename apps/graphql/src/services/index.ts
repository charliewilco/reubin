import { RSSKit } from "../rss";
import { Passwords } from "./passwords";
import { TokenManager } from "./tokens";
import * as Validations from "./validations";

export interface Services {
  token: TokenManager;
  password: Passwords;
  validations: typeof Validations;
  rss: RSSKit<unknown, unknown>;
}

export const services: Services = {
  token: new TokenManager(),
  password: new Passwords(),
  validations: Validations,
  rss: new RSSKit(),
};
