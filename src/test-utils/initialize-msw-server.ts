import { setupServer } from "msw/node";
import { beforeAll, afterEach, afterAll } from "vitest";

export function initalizeMswServer() {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  return server;
}
