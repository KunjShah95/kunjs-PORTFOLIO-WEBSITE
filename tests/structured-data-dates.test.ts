import { strict as assert } from "node:assert";
import { test } from "node:test";

import { collectionPageJsonLd, profilePageJsonLd } from "../components/seo/json-ld";

// Google's ProfilePage report rejects a bare date ("Invalid datetime value for
// 'dateModified'"): it wants ISO 8601 with a time and a timezone.
const ISO_DATETIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;

test("ProfilePage dateModified is a full ISO 8601 datetime", () => {
  const ld = profilePageJsonLd({ path: "", name: "x", description: "y" });
  assert.match(String(ld.dateModified), ISO_DATETIME);
});

test("CollectionPage dateModified is a full ISO 8601 datetime", () => {
  const ld = collectionPageJsonLd({ path: "/projects", name: "x", description: "y", items: [] });
  assert.match(String(ld.dateModified), ISO_DATETIME);
});
