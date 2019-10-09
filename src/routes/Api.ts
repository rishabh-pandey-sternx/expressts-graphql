/**
 * Define all your API routes
 *
 * @author Rishabh Pandey <geekrishabh@gmail.com>
 */

import { Router } from 'express';
import * as passport from 'passport';

const router = Router();

router.get('/', (req, res, next) => {
  return res.json({
    status: 'Ok!'
  });
});

export default router;
