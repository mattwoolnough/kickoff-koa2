import Router from 'koa-router';
import Errors from 'boom';
import compose from 'koa-compose';

import * as Ctrl from '../controller/user';
import { isAuthenticated } from '../utils/passport';

const router = new Router({
    prefix: '/users',
});

router.get('/', Ctrl.get);
router.get('/me', isAuthenticated(), Ctrl.me);
router.put('/me', isAuthenticated(), Ctrl.updateMe);
router.get('/password/reset', isAuthenticated(), Ctrl.passwordReset);

const routes = router.routes();
const allowedMethods = router.allowedMethods({
    throw: true,
    notImplemented: () => new Errors.notImplemented(),
    methodNotAllowed: () => new Errors.methodNotAllowed(),
});

export default () => compose([
    routes,
    allowedMethods,
]);
