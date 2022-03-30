import { ERepairStatus } from '@enums/repair-status.enum';

export function isFinishedStatus(idStatus: number): boolean {
    return [
        ERepairStatus.FINISHED_AND_PAID,
        ERepairStatus.RETURNED_WITHOUT_REPAIR,
        ERepairStatus.FINISHED_DIAGNOSTICS,
    ].includes(idStatus);
}
