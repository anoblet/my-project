import { Mixin } from '@anoblet/mixin'
import { HelperMixin } from '@anoblet/helper-mixin'

export const BaseMixin = (superclass: any) => class extends Mixin(superclass, [/* DebugMixin */, HelperMixin]) {
}
