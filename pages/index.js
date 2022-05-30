import { Heading, Page, DisplayText } from "@shopify/polaris";

function Index(props) {
  return (
    <Page>
      <Heading>Velkommen til ønskeliste appen!!</Heading>
      <DisplayText size="medium">
        For at se eller ændre indstillinger, gå til Settings
      </DisplayText>
    </Page>
  );
}

export default Index;
