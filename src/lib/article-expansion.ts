import Parser from "@postlight/parser";
import { Services } from "./services";

export class ArticleExpander {
	static async getArticle(id: string, link: string): Promise<Parser.ParseResult> {
		let key = `entry:${id}`;
		let result = await Services.kv.get<Parser.ParseResult>(key);

		if (result) {
			return result;
		}

		let parsed = await Parser.parse(link);

		await Services.kv.set(key, parsed);

		return parsed;
	}
}
