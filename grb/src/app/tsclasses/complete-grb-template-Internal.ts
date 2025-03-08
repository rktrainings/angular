import { GrbTemplateEnh } from './grb-template-enh';
import { GrbTemplateTransfer } from './grb-template-transfer';
import { GrbTemplateBackfill } from './grb-template-backfill';

export class CompleteGrbTemplateInternal {
    grbTemplateEnh: GrbTemplateEnh;
    grbTemplateTransfer: GrbTemplateTransfer[];
    grbTemplateBackfill: GrbTemplateBackfill[];
}
