# Client-Server Communication: Table Of Contents

- [Client-Server Communication: Table Of Contents](#client-server-communication-table-of-contents)
  - [AJAX](#ajax)
  - [Long Poll](#long-poll)
  - [WebSockets](#websockets)
  - [WebRTC](#webrtc)
  - [Server-Sent Events (SSE) / EventSource](#server-sent-events-sse--eventsource)
  - [Comet](#comet)
    - [Comet Techniques](#comet-techniques)
      - [Hidden iframe](#hidden-iframe)
        - [Benefits](#benefits)
        - [Downsides](#downsides)
      - [XMLHttpRequest](#xmlhttprequest)
      - [Ajax with long polling](#ajax-with-long-polling)
        - [XMLHttpRequest long polling](#xmlhttprequest-long-polling)
        - [Script tag long polling](#script-tag-long-polling)

## AJAX

`Request -> Response`

1. `Client` creates a connection to the `Server`.
2. `Client` sends request headers with optional data.
3. `Client` gets a response from the `Server`.
4. `Client` closes the connection.

Supported in all major browsers.

## Long Poll

`Request -> ... -> Response`

- `Client` creates a connection to the `Server`, but maintains a keep-alive
  connection open for some time (not long though).

  During connection, the open `Client` can receive data from the server.

- `Client` has to reconnect periodically after the connection is closed,
  due to timeouts or data eof.

- On `Server` it is still treated like an HTTP request, except the response will
  be immediate or in future.

## WebSockets

`Client <-> Server`

- `Client` creates a TCP connection to the `Server`, and keep it open as long as
   needed.

- The `Server` or `Client` can easily close the connection.

- The `Client` goes through an HTTP compatible handshake process.

  If it succeeds, then the `Server and Client` can exchange data in both
  directions at any time.

  It is efficient if the application requires frequent data exchange in both
  ways.

  WebSockets do have data framing that includes masking for each message sent
  from `Client` to `Server`, so data is simply encrypted.

## WebRTC

`peer <-> peer`

- Transport to establish communication between `Clients` and is
  transport-agnostic, so it can use UDP, TCP or even more abstract layers.

- This is generally used for high volume data transfer, such as video/audio
  streaming, where reliability is secondary and a few frames or reduction in
  quality progression can be sacrificed in favour of response time and, at least
  , some data transfer.

- Both sides (`peers`) can push data to each other independently.

- While it can be used totally independent from any centralised servers, it
  still requires some way of exchanging endPoints data, where in most cases
  developers still use centralised servers to "link" `peers`.

  This is required only to exchange essential data for establishing a connection
  , after which a centralised server is not required.

## Server-Sent Events (SSE) / EventSource

`Client <- Server`

- `Client` establishes persistent and long-term connection to `Server`.
- Only the `Server` can send data to a `Client`.

- If the `Client` wants to send data to the `Server`, it would require the use
  of another technology/protocol to do so.

- This protocol is HTTP compatible and simple to implement in most `server`-side
  platforms.

- This is a preferable protocol to be used instead of Long Polling.

## Comet

- A web application model in which a long-held HTTPS request allows a
  web `server` to push data to a browser, without the browser explicitly
  requesting it.

- "Comet" is an umbrella term, encompassing multiple techniques for achieving
  this interaction.

- The Comet approach differs from the original model of the web, in which a
  browser requests a complete web page at a time.

- Comet is known by several other names, including Ajax Push, Reverse Ajax,
  Two-way-web, HTTP Streaming, and HTTP server push among others.

- In recent years, the standardisation and widespread support of `WebSocket` and
  `Server-sent events` has rendered the Comet model obsolete.

### Comet Techniques

#### Hidden iframe

- An inline frame, which allows a website to embed one HTML document inside
  another.

- This invisible iframe is sent as a chunked block, which implicitly declares it
  as infinitely long (sometimes called "forever frame").

- As events occur, the iframe is gradually filled with `script` tags, containing
  JavaScript to be executed in the browser.

  Because browsers render HTML pages incrementally, each script tag is executed
  as it is received.

  Some browsers require a specific minimum document size before parsing and
  execution is started, which can be obtained by initially sending 1–2 kB of
  padding spaces.

##### Benefits

Works in every common browser.

##### Downsides

- lack of a reliable error handling method, and the
- impossibility of tracking the state of the request calling process.

#### XMLHttpRequest

Browser fires the `onreadystatechange` callback each time it receives new data.

#### Ajax with long polling

- Long polling requires the client to poll the server for an event (or set of
  events).

- The browser makes an Ajax-style request to the server, which is kept open
  until the server has new data to send to the browser, which is sent to the
  browser in a complete response.

- The browser initiates a new long polling request in order to obtain subsequent
  events.

- IETF RFC 6202 "Known Issues and Best Practices for the Use of Long Polling and
  Streaming in Bidirectional HTTP" compares long polling and HTTP streaming.

Specific technologies for accomplishing long-polling include the following:

##### XMLHttpRequest long polling

- For the most part, XMLHttpRequest long polling works like any standard use of
  XHR.

- The browser makes an asynchronous request of the server, which may wait for
  data to be available before responding.

- The response can contain encoded data (typically XML or JSON) or Javascript to
  be executed by the client.

- At the end of the processing of the response, the browser creates and sends
  another XHR, to await the next event.

- Thus the browser always keeps a request outstanding with the server, to be
  answered as each event occurs.

##### Script tag long polling

- While any Comet transport can be made to work across subdomains, none of the
  above transports can be used across different second-level domains (SLDs), due
  to browser security policies designed to prevent cross-site scripting attacks.

  That is, if the main web page is served from one SLD, and the Comet server is
  located at another SLD (which does not have cross-origin resource sharing
  enabled), Comet events cannot be used to modify the HTML and DOM of the main
  page, using those transports.

- This problem can be sidestepped by creating a proxy server in front of one or
  both sources, making them appear to originate from the same domain. However,
  this is often undesirable for complexity or performance reasons.

- Unlike `iframes` or `XMLHttpRequest` objects, `script` tags can be pointed at
  any URI, and JavaScript code in the response will be executed in the current
  HTML document.

  This creates a potential security risk for both servers involved, though the
  risk to the data provider (in our case, the Comet server) can be avoided using
  JSONP.

- A long-polling Comet transport can be created by dynamically creating script
  elements, and setting their source to the location of the Comet server, which
  then sends back JavaScript (or JSONP) with some event as its payload.

  Each time the script request is completed, the browser opens a new one, just
  as in the XHR long polling case. This method has the advantage of being
  cross-browser while still allowing cross-domain implementations.
