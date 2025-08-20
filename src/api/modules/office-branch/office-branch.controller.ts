import { Request, Response, NextFunction, Router } from 'express';
import { OfficeBranchService } from './office-branch.service';
import { CreateOfficeBranchRequestBody } from '@models/office-branch.model';

const router = Router();
const officeBranchService = new OfficeBranchService();

export default router;

router.get('', async (_: Request, res: Response, next: NextFunction) => {
  try {
    const officeBranches = await officeBranchService.get();
    res.json(officeBranches);
  } catch (err) {
    next(err);
  }
});

router.post('', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const branchData: CreateOfficeBranchRequestBody = req.body;
    const officeBranch = await officeBranchService.create(branchData);
    res.json(officeBranch);
  } catch (err) {
    next(err);
  }
});
