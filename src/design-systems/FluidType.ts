import { css } from "lit-element";

export default css`
  /* https://andy-bell.design/wrote/custom-property-controlled-fluid-type-sizing/ */
  .fluid-type {
    --fluid-type-min-size: 1;
    --fluid-type-max-size: 2;
    --fluid-type-min-screen: 20;
    --fluid-type-max-screen: 88;

    font-size: calc(
      (var(--fluid-type-min-size) * 1rem) +
        (var(--fluid-type-max-size) - var(--fluid-type-min-size)) *
        (100vw - (var(--fluid-type-min-screen) * 1rem)) /
        (var(--fluid-type-max-screen) - var(--fluid-type-min-screen))
    );
  }

  /*
* SET LOCKS ON ELEMENTS
*/
  h1, h1.fluid-type {
    --fluid-type-min-size: 2;
    --fluid-type-max-size: 4;
  }

  h2, h2.fluid-type {
    --fluid-type-min-size: 1.5;
    --fluid-type-max-size: 2.2;
  }

  blockquote.fluid-type {
    --fluid-type-min-size: 1.2;
    --fluid-type-max-size: 1.8;
  }

  /*
* PRESENTATION STYLES
*/
  body {
    line-height: 1.4;
  }

  h1,
  h2,
  h3 {
    line-height: 1.2;
  }

  p {
    /* font-size: 1.25rem; */
    max-width: 75ch;
  }


  blockquote {
    font-weight: 400;
    font-style: italic;
    line-height: 1.6;
  }

  blockquote p {
    font-size: 1em;
  }

  article {
    max-width: 50rem;
    margin: 0 auto;
  }

  article > * + * {
    margin-top: 1.8em;
  }

  hr {
    border: none;
    height: 1px;
    background: #ccc;
    margin: 3em auto;
    max-width: 30rem;
  }
`;
