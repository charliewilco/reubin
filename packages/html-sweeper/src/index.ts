import { ImageSanitizerPlugin } from "./plugins/images";
import { HrefSanitizerPlugin } from "./plugins/naughty-href";
import { XSSSanitizerPlugin } from "./plugins/xss";
import { ScriptAndStyleTagRemoverPlugin } from "./plugins/remove-js-css";
import { YoutubeIframeSanitizerPlugin } from "./plugins/youtube";
import type { SanitizerPlugin } from "./plugins/plugin";

import { HTMLSanitizer } from "./sanitizer";

let DEFAULT_PLUGINS: SanitizerPlugin[] = [
	new ImageSanitizerPlugin(),
	new HrefSanitizerPlugin(),
	new XSSSanitizerPlugin(),
	new ScriptAndStyleTagRemoverPlugin(),
	new YoutubeIframeSanitizerPlugin(),
];

function createSanitizer(plugins: SanitizerPlugin[] = DEFAULT_PLUGINS): HTMLSanitizer {
	return new HTMLSanitizer(plugins);
}

export { SanitizerPlugin, createSanitizer };
