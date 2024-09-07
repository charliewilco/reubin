import { lucia } from "./auth";
import { redis } from "./kv";

// biome-ignore lint/complexity/noStaticOnlyClass: it makes me happy
export class Services {
	static auth = lucia;
	static kv = redis;
}
