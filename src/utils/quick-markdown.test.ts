import { quickMarkdownParse } from "$/utils/quick-markdown";

describe("quickMarkdownParse()", () => {
	describe("text formatting", () => {
		test("parses bold with **", () => {
			expect(quickMarkdownParse("I **like** tiny libraries")).toEqual(
				"I <strong>like</strong> tiny libraries"
			);
		});

		test("parses bold with __", () => {
			expect(quickMarkdownParse("I __like__ tiny libraries")).toEqual(
				"I <strong>like</strong> tiny libraries"
			);
		});

		test("parses italics with *", () => {
			expect(quickMarkdownParse("I *like* tiny libraries")).toEqual(
				"I <em>like</em> tiny libraries"
			);
		});

		test("parses italics with _", () => {
			expect(quickMarkdownParse("I _like_ tiny libraries")).toEqual(
				"I <em>like</em> tiny libraries"
			);
		});
	});

	describe("titles", () => {
		test("parses H1 titles", () => {
			expect(quickMarkdownParse("# I like tiny libraries")).toEqual(
				"<h1>I like tiny libraries</h1>"
			);
		});

		test("parses underlined H1 titles", () => {
			expect(quickMarkdownParse("I like tiny libraries\n===")).toEqual(
				"<h1>I like tiny libraries</h1>"
			);
		});

		test("parses H2 titles", () => {
			expect(quickMarkdownParse("## I like tiny libraries")).toEqual(
				"<h2>I like tiny libraries</h2>"
			);
		});

		test("parses H3 titles", () => {
			expect(quickMarkdownParse("### I like tiny libraries")).toEqual(
				"<h3>I like tiny libraries</h3>"
			);
		});

		test("parses titles with reference links", () => {
			expect(
				quickMarkdownParse(
					"# I like [tiny libraries]\n\n[tiny libraries]: https://github.com/developit/snarkdown"
				)
			).toEqual(
				'<h1>I like <a href="https://github.com/developit/snarkdown">tiny libraries</a></h1>'
			);
		});
	});

	describe("links & images", () => {
		test("parses links", () => {
			expect(quickMarkdownParse("[Snarkdown](http://github.com/developit/snarkdown)")).toEqual(
				'<a href="http://github.com/developit/snarkdown">Snarkdown</a>'
			);
		});

		test("parses anchor links", () => {
			expect(quickMarkdownParse("[Example](#example)")).toEqual(
				'<a href="#example">Example</a>'
			);
		});

		test("parses images", () => {
			expect(quickMarkdownParse("![title](foo.png)")).toEqual(
				'<img src="foo.png" alt="title">'
			);
			expect(quickMarkdownParse("![](foo.png)")).toEqual('<img src="foo.png" alt="">');
		});

		test("parses images within links", () => {
			expect(quickMarkdownParse("[![](toc.png)](#toc)")).toEqual(
				'<a href="#toc"><img src="toc.png" alt=""></a>'
			);
			expect(quickMarkdownParse("[![a](a.png)](#a) [![b](b.png)](#b)")).toEqual(
				'<a href="#a"><img src="a.png" alt="a"></a> <a href="#b"><img src="b.png" alt="b"></a>'
			);
		});

		test("parses reference links", () => {
			expect(quickMarkdownParse("\nhello [World]!\n[world]: http://world.com")).toEqual(
				'hello <a href="http://world.com">World</a>!'
			);
		});

		test("parses reference links without creating excessive linebreaks", () => {
			expect(quickMarkdownParse("\nhello [World]!\n\n[world]: http://world.com")).toEqual(
				'hello <a href="http://world.com">World</a>!'
			);
		});
	});

	describe("lists", () => {
		test("parses an unordered list with *", () => {
			expect(quickMarkdownParse("* One\n* Two")).toEqual("<ul><li>One</li><li>Two</li></ul>");
		});

		test("parses an unordered list with -", () => {
			expect(quickMarkdownParse("- One\n- Two")).toEqual("<ul><li>One</li><li>Two</li></ul>");
		});

		test("parses an unordered list with +", () => {
			expect(quickMarkdownParse("+ One\n+ Two")).toEqual("<ul><li>One</li><li>Two</li></ul>");
		});

		test("parses an unordered list with mixed bullet point styles", () => {
			expect(quickMarkdownParse("+ One\n* Two\n- Three")).toEqual(
				"<ul><li>One</li><li>Two</li><li>Three</li></ul>"
			);
		});

		test("parses an ordered list", () => {
			expect(quickMarkdownParse("1. Ordered\n2. Lists\n4. Numbers are ignored")).toEqual(
				"<ol><li>Ordered</li><li>Lists</li><li>Numbers are ignored</li></ol>"
			);
		});
	});

	describe("line breaks", () => {
		test("parses two new lines as line breaks", () => {
			expect(quickMarkdownParse("Something with\n\na line break")).toEqual(
				"Something with<br />a line break"
			);
		});

		test("parses two spaces as a line break", () => {
			expect(quickMarkdownParse("Something with  \na line break")).toEqual(
				"Something with<br />a line break"
			);
		});
	});

	describe("code & quotes", () => {
		test("parses inline code", () => {
			expect(quickMarkdownParse("Here is some code `var a = 1`.")).toEqual(
				"Here is some code <code>var a = 1</code>."
			);
		});

		test("escapes inline code", () => {
			expect(quickMarkdownParse('a `<">` b')).toEqual("a <code>&lt;&quot;&gt;</code> b");
		});

		test("parses three backtricks (```) as a code block", () => {
			expect(
				quickMarkdownParse('```\nfunction codeBlocks() {\n\treturn "Can be inserted";\n}\n```')
			).toEqual(
				'<pre class="code "><code>function codeBlocks() {\n\treturn &quot;Can be inserted&quot;;\n}</code></pre>'
			);

			expect(
				quickMarkdownParse(
					'```js\nfunction codeBlocks() {\n\treturn "Can be inserted";\n}\n```'
				)
			).toEqual(
				'<pre class="code js"><code class="language-js">function codeBlocks() {\n\treturn &quot;Can be inserted&quot;;\n}</code></pre>'
			);
		});

		test("parses tabs as a code poetry block", () => {
			expect(quickMarkdownParse("\tvar a = 1")).toEqual(
				'<pre class="code poetry"><code>var a = 1</code></pre>'
			);
		});

		test("escapes code/quote blocks", () => {
			expect(quickMarkdownParse("```\n<foo>\n```")).toEqual(
				'<pre class="code "><code>&lt;foo&gt;</code></pre>'
			);
			expect(quickMarkdownParse("\t<foo>")).toEqual(
				'<pre class="code poetry"><code>&lt;foo&gt;</code></pre>'
			);
		});

		test("parses a block quote", () => {
			expect(quickMarkdownParse("> To be or not to be")).toEqual(
				"<blockquote>To be or not to be</blockquote>"
			);
		});

		test("parses lists within block quotes", () => {
			expect(quickMarkdownParse("> - one\n> - two\n> - **three**\nhello")).toEqual(
				"<blockquote><ul><li>one</li><li>two</li><li><strong>three</strong></li></ul></blockquote>\nhello"
			);
		});
	});

	describe("horizontal rules", () => {
		test("should parse ---", () => {
			expect(quickMarkdownParse("foo\n\n---\nbar")).toEqual("foo<hr />bar");
			// expect(quickMarkdownParse("foo\n\n----\nbar"), "----").toEqual("foo<hr />bar");
			expect(quickMarkdownParse("> foo\n\n---\nbar")).toEqual(
				"<blockquote>foo</blockquote><hr />bar"
			);
		});

		test("should parse * * *", () => {
			expect(quickMarkdownParse("foo\n* * *\nbar")).toEqual("foo<hr />bar");
			// expect(quickMarkdownParse("foo\n* * * *\nbar"), "* * * *").toEqual("foo<hr />bar");
			expect(quickMarkdownParse("> foo\n\n* * *\nbar")).toEqual(
				"<blockquote>foo</blockquote><hr />bar"
			);
		});
	});

	describe("edge cases", () => {
		test("should close unclosed tags", () => {
			expect(quickMarkdownParse("*foo")).toEqual("<em>foo</em>");
			expect(quickMarkdownParse("foo**")).toEqual("foo<strong></strong>");
			expect(quickMarkdownParse("[some **bold text](#winning)")).toEqual(
				'<a href="#winning">some <strong>bold text</strong></a>'
			);
			expect(quickMarkdownParse("`foo")).toEqual("`foo");
		});

		test("should not choke on single characters", () => {
			expect(quickMarkdownParse("*")).toEqual("<em></em>");
			expect(quickMarkdownParse("_")).toEqual("<em></em>");
			expect(quickMarkdownParse("**")).toEqual("<strong></strong>");
			expect(quickMarkdownParse(">")).toEqual(">");
			expect(quickMarkdownParse("`")).toEqual("`");
		});
	});
});
