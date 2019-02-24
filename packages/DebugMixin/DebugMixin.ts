import { Mixin } from "../Mixin";
import { BorderDebug } from "../BorderDebug";
// import { TooltipDebug } from '@anoblet/tooltip-debug'

export const DebugMixin = (superclass: any) => class extends Mixin(superclass, [BorderDebug]) {
};
