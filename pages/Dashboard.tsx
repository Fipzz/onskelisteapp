import { Heading, Page } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Button } from "@shopify/polaris";
import React from "react";
import TabsExample from "./components/TabsExample";

export default function Dashboard(props) {
  console.log(props);
  return (
    <Page>
      <Heading>Dashboard</Heading>
    </Page>
  );
}
