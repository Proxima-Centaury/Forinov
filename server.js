/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Declarations */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT || 3000;
// When using middleware, 'hostname' and 'port' must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* App */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            // Be sure to pass 'true' as the second argument to 'url.parse'
            // This tells it to parse the query portion of the URL
            const parsedUrl = parse(req.url, true);
            const { pathname, query } = parsedUrl;
            if(pathname === "/a") {
                await app.render(req, res, "/a", query);
            } else if(pathname === "/b") {
                await app.render(req, res, "/b", query);
            } else {
                await handle(req, res, parsedUrl);
            };
        } catch(error) {
            console.error("Error occurred handling", req.url, error);
            res.statusCode = 500;
            res.end("internal server error");
        };
    }).listen(port, (error) => {
        if(error) {
            throw error;
        };
        console.log(`> Ready on http://${ hostname }:${ port }`);
    });
});