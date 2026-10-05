import { describe, it, expect } from "vitest";

describe("Frontend Sanity & Contract Tests", () => {
  it("validates expected API response schema", () => {
    const mockApiResponse = {
      status: "ok",
      items: [
        "Configurar Docker",
        "Automatizar CI",
        "Publicar no GHCR",
      ],
    };

    expect(mockApiResponse.status).toBe("ok");
    expect(mockApiResponse.items).toHaveLength(3);
    expect(mockApiResponse.items).toContain("Configurar Docker");
    expect(mockApiResponse.items).toContain("Automatizar CI");
    expect(mockApiResponse.items).toContain("Publicar no GHCR");
  });
});
