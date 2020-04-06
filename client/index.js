sinon.FakeXMLHttpRequest.useFilters = true;
sinon.FakeXMLHttpRequest.addFilter(() => true);

const server = sinon.fakeServer.create();

const xhr = new XMLHttpRequest();
xhr.open("GET", "http://www.mocky.io/v2/5e8aa67e2d00003c1a1a473e", true);

/*
 * Setting `withCredentials` applies only to the FakeXhr instance.
 * The `workingXHR` in `defake` does not receive this.
 *
 * Putting a breakpoint in the `fakeXhr.send` function inside `defake` can
 * reveal this issue.
 *
 * We might need to use Proxy for this, or copy attributes again in `send`.
 */
xhr.withCredentials = true;
xhr.send();
