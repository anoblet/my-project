import { Mixin } from "../Mixin";
import { HelperMixin } from "../HelperMixin";

export const BaseMixin = (superclass: any) => class extends Mixin(superclass, [/* DebugMixin */, HelperMixin]) {
};
