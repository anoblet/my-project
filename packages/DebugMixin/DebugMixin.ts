import { Mixin } from "@anoblet/mixin";
import { BorderDebug } from "@anoblet/border-debug";
// import { TooltipDebug } from '@anoblet/tooltip-debug'

export const DebugMixin = (superclass: any) => class extends Mixin(superclass, [BorderDebug]) {
};
