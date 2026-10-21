import { createServer } from "node:http";

/**
 * A stand-in for the Resend API, so the contact form can be exercised
 * end to end without sending a real email. Records what it was asked to
 * send, so a test can assert on the delivered message.
 */
const received = [];

const server = createServer((req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    received.push(JSON.parse(body || "{}"));
    console.log("SEND:", JSON.stringify(JSON.parse(body || "{}"), null, 2));
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ id: "mock-1" }));
  });
});

server.listen(4599, () => console.log("mock resend on 4599"));

process.on("SIGTERM", () => {
  console.log("RECEIVED_COUNT", received.length);
  server.close(() => process.exit(0));
});
