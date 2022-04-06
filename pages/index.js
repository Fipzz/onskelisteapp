import { Heading, Page, TextField } from "@shopify/polaris";

function Index(props) {
  async function getProducts() {
    const res = await props.axios_instance.get("/products");
    return res;
  }

  async function handleClick() {
    const result = await getProducts();
    console.log(result);
  }

  return (
    <Page>
      <Heading>Shopify app with Node and React </Heading>
      <input value="Update Pages" type="submit" onClick={handleClick}></input>
    </Page>
  );
}

export default Index;
