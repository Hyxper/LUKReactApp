import { Helmet } from 'react-helmet';

const Head = () => {
  return (
    <Helmet>
      <meta charSet="UTF-8" />
      <link href="/assets/favicon.ico" type="image/x-icon" rel="shortcut icon"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Logistics UK App</title>
    </Helmet>
  );
};

export default Head;