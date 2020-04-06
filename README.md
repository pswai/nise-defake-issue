# nise-defake-issue

## Start server
```bash
npm start
```

## Repro Issue
When using `FakeXMLHttpRequest` in Sinon, `useFilters` can be used to bypass fake XHR for configured urls.
This is achieved by the `defake` function in `nise` that maps important functions between the fake XHR and
`XmlHttpRequest`. `defake` is called in [`open`](https://github.com/sinonjs/nise/blob/fd08db8fcc/lib/fake-xhr/index.js#L489).

However, since user still holds the instance of `FakeXMLHttpRequest` instead of `XmlHttpRequest`. Modifications to it
are not propagated to the real XHR behind. This can sometimes cause issue.

## Minimal Example
```javascript
sinon.FakeXMLHttpRequest.useFilters = true;
sinon.FakeXMLHttpRequest.addFilter(() => true);

const server = sinon.fakeServer.create();

const xhr = new XMLHttpRequest();
xhr.open("GET", "http://www.mocky.io/v2/5e8aa67e2d00003c1a1a473e", true);
xhr.withCredentials = true;
xhr.send();
```

The actual XHR does not have `withCredentials` set to `true`.
