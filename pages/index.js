import { Heading, Page } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Button } from "@shopify/polaris";
import React from "react";
import TabsExample from "./components/TabsExample.tsx";
import art from "./media/test.jpg";

export default function Index() {
  return (
    <Page>
      <TabsExample />

      <Heading>
        Landingpage for onskelisteapp{" "}
        <span role="img" aria-label="tada emoji">
          🎉
        </span>
      </Heading>
      <AppProvider i18n={enTranslations}>
        <Button onClick={() => alert("Button clicked!")}>Example button</Button>
      </AppProvider>

      <img src="test.jpg" alt="pic" />
    </Page>
  );
}
