import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    -webkit-text-size-adjust: 100%;
    color-scheme: ${({ theme }) => theme.name};
  }

  body {
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.text};
    font-size: ${({ theme }) => theme.fontSizes.md};
    line-height: ${({ theme }) => theme.lineHeights.base};
    -webkit-font-smoothing: antialiased;
    transition: background-color ${({ theme }) => theme.transitions.base},
      color ${({ theme }) => theme.transitions.base};
  }

  h1, h2, h3, h4 {
    font-family: ${({ theme }) => theme.fonts.title};
    color: ${({ theme }) => theme.colors.title};
    line-height: ${({ theme }) => theme.lineHeights.tight};
  }

  img, svg {
    display: block;
    max-width: 100%;
  }

  button, input, select, textarea {
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
    background: none;
    border: 0;
  }

  button:disabled {
    cursor: not-allowed;
  }

  a {
    color: inherit;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
    }
  }
`
