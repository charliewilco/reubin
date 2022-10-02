interface RSSLink {
  href: string;
  type: string;
  title: string;
}

let thisPageLinkObjects: RSSLink[] = [];

// I convert the native "link" node into an object that I can pass out to the global page
function objectFromLink(link: HTMLLinkElement) {
  return {
    href: link.href,
    type: link.type,
    title: link.title,
  };
}

// Some sites will list feeds with inappropriate or at least less-than-ideal information
// in the MIME type attribute. We cover some edge cases here that allow to be passed through,
// where they will successfully open as "feed://" URLs in the browser.
function isValidFeedLink(link: HTMLLinkElement) {
  var isValid = false;

  switch (link.type) {
    case "application/atom+xml":
    case "application/x.atom+xml":
    case "application/rss+xml":
      // These types do not require other criteria.
      isValid = link.href != null;

    case "text/xml":
    case "application/rdf+xml":
      // These types require a title that has "RSS" in it.
      if (link.title && link.title.search(/RSS/i) != -1) {
        isValid = link.href != null;
      }
  }

  return isValid;
}

export function scanForSyndicationFeeds() {
  // In case we don't find any, we establish that we have at least tried by setting the
  // variables to empty instead of null.
  thisPageLinkObjects = [];

  const links: NodeListOf<HTMLLinkElement> = document.querySelectorAll(
    "link[href][rel~='alternate'][type]"
  );

  for (var i = 0; i < links.length; i++) {
    var thisLink = links[i];
    if (isValidFeedLink(thisLink)) {
      thisPageLinkObjects.push(objectFromLink(thisLink));
    }
  }
}

function subscribeToFeed(feed: RSSLink) {
  // Convert the URL to a feed:// scheme because Safari
  // will refuse to load e.g. a feed that is listed merely
  // as "text/xml". We do some preflighting of the link rel
  // in the PageLoadEnd.js so we can be more confident it's a
  // good feed: URL.
  let feedURL = feed.href;
  if (!feedURL.startsWith("feed:")) {
    feedURL = "feed:" + feedURL;
  }

  // chrome.pageAction.("subscribeToFeed", { "url": feedURL });
}

export function messageHandler(event) {
  if (event.name === "toolbarButtonClicked") {
    // Workaround Radar #31182842, in which residual copies of our
    // app extension may remain loaded in context of pages in Safari,
    // causing multiple responses to broadcast message about toolbar
    // button being clicked. In the case of the "extra" injections,
    // the document location is null, so we can avoid doing on anything.
    if (document.location != null && thisPageLinkObjects.length > 0) {
      var feedToOpen = thisPageLinkObjects[0];
      subscribeToFeed(feedToOpen);
    }
  } else if (event.name === "ping") {
    // Just a hack to get the toolbar icon validation to work as expected.
    // If we don't pong back, the extension knows we are not loaded in a page.

    // There is a bug in Safari where the messageHandler is apparently held on to by Safari
    // even after an extension is disabled. So an effort to "ping" an extension's scripts will
    // succeed even if its been disabled and the page reloaded. Checking for the existence of
    // document.location seems to ensure we have enough of a handle still on the document that
    // we can do something useful with it.
    var shouldValidate = document.location != null && thisPageLinkObjects.length > 0;

    // Pass back the same validationID we were handed so they can look up the correlated validationHandler
    // safari.extension.dispatchMessage("pong", {
    //   validationID: event.message.validationID,
    //   shouldValidate: shouldValidate,
    // });
  }
}

// document.addEventListener("DOMContentLoaded", function (event) {
//   // Prevent injecting the JavaScript in IFRAMES, and from acting before Safari is ready...
//   if (window.top === window && typeof safari != "undefined" && document.location != null) {
//     safari.self.addEventListener("message", messageHandler, false);
//     scanForSyndicationFeeds();
//   }
// });
