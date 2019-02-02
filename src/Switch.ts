/**
 * Use cases are:
 *
 * ${type, callbacks = [
 *     "text": renderTextField()...;
 * ]}
 *
 * @param  (callback [description]
 * @return           [description]
 */
// Callbacks is an array of values, mapped to... callbacks

const _switch = (expression: unknown, callbacks: any) => {
  return callbacks.map((callback: unknown) => {});
};

// Lets assume callback is a TemplateReult
const ifTruthy = (expression: any, callback: any) =>
  !!expression ? callback : "";
