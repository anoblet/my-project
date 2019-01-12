import { html } from 'lit-element';
import { until } from 'lit-html/directives/until';
import { Mixin } from '@anoblet/mixin'
import { DebugMixin } from '@anoblet/debug-mixin'
import { HelperMixin } from '@anoblet/helper-mixin'

export const BaseMixin = (superclass: any) => class extends Mixin(superclass, [/* DebugMixin */, HelperMixin]) {
}
