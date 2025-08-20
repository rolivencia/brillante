import { Request, Response, NextFunction, Router } from 'express';
import { CustomerService } from './customer.service';
import { CreateCustomerRequestBody, UpdateCustomerRequestBody } from '@models/customer.model';

const router = Router();
const customerService = new CustomerService();

export default router;

// TODO: Is this used?
router.get('/countAll', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const count = await customerService.countAll();
        res.json(count);
    } catch (err) {
        next(err);
    }
});

router.get('', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { offset, limit } = req.query;

        const params = {
            offset: offset ? parseInt(offset as string) : 0,
            limit: limit ? parseInt(limit as string) : 20
        };

        const customers = await customerService.getAll(params);
        res.json(customers);
    } catch (err) {
        next(err);
    }
});

router.get('/getByDni/:dni', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dni = parseInt(req.params['dni']);
        const customer = await customerService.getByDni(dni);
        res.json(customer);
    } catch (err) {
        next(err);
    }
});

router.get('/getByEmail/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.params['email'];
        const customer = await customerService.getByEmail(email);
        res.json(customer);
    } catch (err) {
        next(err);
    }
});

router.get('/getById/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params['id']);
        const customer = await customerService.getById(id);
        res.json(customer);
    } catch (err) {
        next(err);
    }
});

router.post('', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customerData: CreateCustomerRequestBody = req.body;
        const [customer, created] = await customerService.create(customerData);
        res.json({ customer, created });
    } catch (err) {
        next(err);
    }
});

router.put(':id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params['id']);
        const customerData: UpdateCustomerRequestBody = req.body;
        const customer = await customerService.update(id, customerData);
        res.json(customer);
    } catch (err) {
        next(err);
    }
});

router.delete(':id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params['id']);
        const result = await customerService.delete(id);
        res.json({ deleted: result });
    } catch (err) {
        next(err);
    }
});
