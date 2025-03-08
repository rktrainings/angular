import { GrbTemplateEnh } from './grb-template-enh';
import { GrbTemplateTransfer } from './grb-template-transfer';
import { GrbTemplateGom } from './grb-template-gom';
import { GrbTemplateBackfill } from './grb-template-backfill';

export class CompleteGRBTemplateExternal {
    grbTemplateEnh: GrbTemplateEnh;
    grbTemplateGom: GrbTemplateGom;
    grbTemplateTransfer: GrbTemplateTransfer[];
    grbTemplateBackfill: GrbTemplateBackfill[];
		
}
