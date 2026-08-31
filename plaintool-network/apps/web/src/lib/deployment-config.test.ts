import { describe, expect, it } from "vitest";
import {
  implementedIntegrationCapabilities,
  resolveDeploymentConfig,
} from "./deployment-config.js";

const completeEnvironment = {
  PUBLIC_SITE_ORIGIN: "https://plaintool.example",
  PUBLIC_OPERATOR_NAME: "PlainTool Operator",
  PUBLIC_CONTACT_EMAIL: "contact@plaintool.example",
  PUBLIC_OPERATOR_REGION: "Republic of Korea",
  PUBLIC_POLICY_EFFECTIVE_DATE: "2026-08-29",
  PUBLIC_HOST_PROVIDER_NAME: "Example Host",
  PUBLIC_HOST_PRIVACY_URL: "https://host.example/privacy",
  PUBLIC_HOST_LOG_RETENTION: "30 days",
  PUBLIC_GOVERNING_LAW: "Republic of Korea",
  PUBLIC_JURISDICTION: "Seoul Central District Court",
};
describe("deployment configuration", () => {
  it("keeps preview builds non-indexable even when production facts are present", () => {
    const config = resolveDeploymentConfig(
      completeEnvironment,
      "preview",
      implementedIntegrationCapabilities,
    );

    expect(config.productionReady).toBe(false);
    expect(config.origin).toBe("https://preview.invalid");
    expect(config.issues).toEqual([]);
  });

  it("accepts a complete production configuration without integrations", () => {
    const config = resolveDeploymentConfig(
      completeEnvironment,
      "production",
      implementedIntegrationCapabilities,
    );

    expect(config.productionReady).toBe(true);
    expect(config.origin).toBe("https://plaintool.example");
    expect(config.integrations.active).toBe(false);
  });

  it("fails closed when required production facts or URLs are invalid", () => {
    const config = resolveDeploymentConfig(
      {
        ...completeEnvironment,
        PUBLIC_SITE_ORIGIN: "http://plaintool.example/path",
        PUBLIC_HOST_PRIVACY_URL: "not-a-url",
        PUBLIC_OPERATOR_NAME: "",
      },
      "production",
      implementedIntegrationCapabilities,
    );

    expect(config.productionReady).toBe(false);
    expect(config.origin).toBe("https://preview.invalid");
    expect(config.issues.map((issue) => issue.key)).toEqual(
      expect.arrayContaining([
        "PUBLIC_SITE_ORIGIN",
        "PUBLIC_HOST_PRIVACY_URL",
        "PUBLIC_OPERATOR_NAME",
      ]),
    );
  });

  it("requires an explicit operator region instead of promoting the preview fallback", () => {
    const { PUBLIC_OPERATOR_REGION: _region, ...withoutRegion } =
      completeEnvironment;
    const config = resolveDeploymentConfig(
      withoutRegion,
      "production",
      implementedIntegrationCapabilities,
    );

    expect(config.productionReady).toBe(false);
    expect(config.origin).toBe("https://preview.invalid");
    expect(config.operator.region).toBe(
      "[Operator region required before launch]",
    );
    expect(config.issues).toContainEqual(
      expect.objectContaining({
        code: "required",
        key: "PUBLIC_OPERATOR_REGION",
      }),
    );
  });

  it.each([
    ["PUBLIC_CONTACT_EMAIL", "not-an-email", "invalid-email"],
    ["PUBLIC_CONTACT_EMAIL", "two@@plaintool.example", "invalid-email"],
    ["PUBLIC_CONTACT_EMAIL", "contact@plain..example", "invalid-email"],
    ["PUBLIC_POLICY_EFFECTIVE_DATE", "2026-02-30", "invalid-date"],
    ["PUBLIC_POLICY_EFFECTIVE_DATE", "29-08-2026", "invalid-date"],
  ])("rejects invalid typed production fact %s=%s", (key, value, code) => {
    const config = resolveDeploymentConfig(
      { ...completeEnvironment, [key]: value },
      "production",
      implementedIntegrationCapabilities,
    );

    expect(config.productionReady).toBe(false);
    expect(config.issues).toContainEqual(
      expect.objectContaining({ code, key }),
    );
  });

  it("rejects HTTPS deployment URLs that contain embedded credentials", () => {
    const config = resolveDeploymentConfig(
      {
        ...completeEnvironment,
        PUBLIC_SITE_ORIGIN: "https://user:secret@plaintool.example",
        PUBLIC_HOST_PRIVACY_URL: "https://user@host.example/privacy",
      },
      "production",
      implementedIntegrationCapabilities,
    );

    expect(config.productionReady).toBe(false);
    expect(config.issues.map((issue) => issue.key)).toEqual(
      expect.arrayContaining(["PUBLIC_SITE_ORIGIN", "PUBLIC_HOST_PRIVACY_URL"]),
    );
  });

  it("does not let environment variables claim unavailable integrations", () => {
    const config = resolveDeploymentConfig(
      {
        ...completeEnvironment,
        PUBLIC_GOOGLE_CMP_ENABLED: "true",
        PUBLIC_GA4_MEASUREMENT_ID: "G-ABC123",
        PUBLIC_ADSENSE_PUBLISHER_ID: "ca-pub-1234567890",
      },
      "production",
      implementedIntegrationCapabilities,
    );

    expect(config.productionReady).toBe(false);
    expect(config.integrations).toEqual({
      adsensePublisherId: "",
      ga4MeasurementId: "",
      googleCmpEnabled: false,
      active: false,
    });
    expect(
      config.issues.filter((issue) => issue.code === "unsupported-capability"),
    ).toHaveLength(3);
  });

  it("enables integrations only when configuration and implementation capabilities agree", () => {
    const config = resolveDeploymentConfig(
      {
        ...completeEnvironment,
        PUBLIC_GOOGLE_CMP_ENABLED: "true",
        PUBLIC_GA4_MEASUREMENT_ID: "G-ABC123",
        PUBLIC_ADSENSE_PUBLISHER_ID: "ca-pub-1234567890",
      },
      "production",
      { googleCmp: true, ga4: true, adsense: true },
    );

    expect(config.productionReady).toBe(true);
    expect(config.integrations).toEqual({
      adsensePublisherId: "ca-pub-1234567890",
      ga4MeasurementId: "G-ABC123",
      googleCmpEnabled: true,
      active: true,
    });
  });

  it("rejects unknown deployment targets", () => {
    expect(() =>
      resolveDeploymentConfig(
        completeEnvironment,
        "staging" as "production",
        implementedIntegrationCapabilities,
      ),
    ).toThrow(TypeError);
  });
});
