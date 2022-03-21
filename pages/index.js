import { Heading, Page } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Button } from "@shopify/polaris";
import React from "react";
import TabsExample from "./components/TabsExample.tsx";

export default function Index() {
  return (
    <Page>
      <TabsExample />

      <Heading>
        Shopify app with Node and React{" "}
        <span role="img" aria-label="tada emoji">
          🎉
        </span>
      </Heading>
      <AppProvider i18n={enTranslations}>
        <Button onClick={() => alert("Button clicked!")}>Example button</Button>
      </AppProvider>
    </Page>
  );
}
