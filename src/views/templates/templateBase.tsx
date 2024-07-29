export const templateBase = ({ children }: Html.PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Noteme - Bexlite</title>
      </head>
      <body>{children}</body>
    </html>
  );
};
