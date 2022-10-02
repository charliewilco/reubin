console.log("Content script");

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(message);
  if (message.text === "searchRSS") {
    let types = [
      "application/rss+xml",
      "application/atom+xml",
      "application/rdf+xml",
      "application/rss",
      "application/atom",
      "application/rdf",
      "text/rss+xml",
      "text/atom+xml",
      "text/rdf+xml",
      "text/rss",
      "text/atom",
      "text/rdf",
    ];
    let links = document.querySelectorAll("link[type]");
    let feeds: RSSLink[] = [];
    for (let i = 0; i < links.length; i++) {
      if (
        links[i].hasAttribute("type") &&
        types.indexOf(links[i].getAttribute("type")) !== -1
      ) {
        let feed_url = links[i].getAttribute("href");

        // If feed's url starts with "//"
        if (feed_url.indexOf("//") === 0) feed_url = "http:" + feed_url;
        // If feed's url starts with "/"
        else if (feed_url.startsWith("/"))
          feed_url = message.url.split("/")[0] + "//" + message.url.split("/")[2] + feed_url;
        else if (!/^(http|https):\/\//i.test(feed_url))
          feed_url = message.url + "/" + feed_url.replace(/^\//g, "");

        let feed = {
          type: links[i].getAttribute("type"),
          href: feed_url,
          title: links[i].getAttribute("title") || feed_url,
        };
        feeds.push(feed);
      }
    }
    sendResponse(feeds);
  }
});

export {};
