import { html } from "lit-element"

export const isTrue = (expression: any, callback: any) => {
  return expression ? callback : html``
}
