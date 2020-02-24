import NextHead from 'next/head';

export function Head() {
  return (
    <NextHead>
      <title>Bread</title>
      <link rel="icon" href="/favicon.ico" />
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      ></meta>
      <meta
        name="description"
        content="A single purpose app that helps me figure out how much flour, water and salt to add when using a levain starer. :)"
      />
    </NextHead>
  );
}
