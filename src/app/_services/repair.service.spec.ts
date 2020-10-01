import { inject, TestBed } from '@angular/core/testing';
import { RepairService } from './repair.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RepairService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RepairService],
        })
    );

    it('should be initialized', inject([RepairService], (repairService: RepairService) => {
        expect(repairService).toBeTruthy();
    }));

    // it("#getById should return value from observable", inject(
    //   [HttpTestingController, RepairService],
    //   (backend: HttpTestingController, repairService: RepairService) => {
    //     const repairId: number = 29684;
    //     repairService.getById(repairId).subscribe(
    //       (data: Repair) => {
    //         expect(data.repairId).toBe(repairId);
    //         expect(data.message).toBe(
    //           "Reparación obtenida correctamente desde la Base de Datos"
    //         );
    //       },
    //       (error: any) => {}
    //     );
    //   }
    // ));
});
