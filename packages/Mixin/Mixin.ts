export const Mixin = (baseClass: any, mixins: any) => mixins.reduce((base: any, mixin: any) => mixin(base), baseClass);
