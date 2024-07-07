export const REGEXPS = {
	unlikelyCandidates:
		/-ad-|ai2html|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
	okMaybeItsACandidate: /and|article|body|column|content|main|shadow/i,

	positive:
		/article|body|content|entry|hentry|h-entry|main|page|pagination|post|text|blog|story/i,
	negative:
		/-ad-|hidden|^hid$| hid$| hid |^hid |banner|combx|comment|com-|contact|foot|footer|footnote|gdpr|masthead|media|meta|outbrain|promo|related|scroll|share|shoutbox|sidebar|skyscraper|sponsor|shopping|tags|widget/i,
	extraneous:
		/print|archive|comment|discuss|e[\-]?mail|share|reply|all|login|sign|single|utility/i,
	byline: /byline|author|dateline|writtenby|p-author/i,
	replaceFonts: /<(\/?)font[^>]*>/gi,
	normalize: /\s{2,}/g,
	videos:
		/\/\/(www\.)?((dailymotion|youtube|youtube-nocookie|player\.vimeo|v\.qq)\.com|(archive|upload\.wikimedia)\.org|player\.twitch\.tv)/i,
	shareElements: /(\b|_)(share|sharedaddy)(\b|_)/i,
	nextLink: /(next|weiter|continue|>([^\|]|$)|»([^\|]|$))/i,
	prevLink: /(prev|earl|old|new|<|«)/i,
	tokenize: /\W+/g,
	whitespace: /^\s*$/,
	hasContent: /\S$/,
	hashUrl: /^#.+/,
	srcsetUrl: /(\S+)(\s+[\d.]+[xw])?(\s*(?:,|$))/g,
	b64DataUrl: /^data:\s*([^\s;,]+)\s*;\s*base64\s*,/i,
	// Commas as used in Latin, Sindhi, Chinese and various other scripts.
	commas: /\u002C|\u060C|\uFE50|\uFE10|\uFE11|\u2E41|\u2E34|\u2E32|\uFF0C/g,
	// See: https://schema.org/Article
	jsonLdArticleTypes:
		/^Article|AdvertiserContentArticle|NewsArticle|AnalysisNewsArticle|AskPublicNewsArticle|BackgroundNewsArticle|OpinionNewsArticle|ReportageNewsArticle|ReviewNewsArticle|Report|SatiricalArticle|ScholarlyArticle|MedicalScholarlyArticle|SocialMediaPosting|BlogPosting|LiveBlogPosting|DiscussionForumPosting|TechArticle|APIReference$/,
	adWords: /^(ad(vertising|vertisement)?|pub(licité)?|werb(ung)?|广告|Реклама|Anuncio)$/iu,
	loadingWords: /^((loading|正在加载|Загрузка|chargement|cargando)(…|\.\.\.)?)$/iu,
};
