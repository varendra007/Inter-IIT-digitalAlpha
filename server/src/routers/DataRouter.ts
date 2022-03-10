import { Router } from 'express';
import { DataController } from '../controllers/DataController';

// The file is responsible to process the api requests and call the required middleware, validator and controller in a centralized place

//@Route: /
//@AUTH not required
//@FUNCTIONS all data related work

class DataRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }
  getRoutes(): void {
    // add all get routes here
    this.router.get('/search', DataController.getAccessionNumber);
  }
  postRoutes(): void {
    // add all post routes here
  }
  putRoutes(): void {
    // add all get routes here
    // this.router.put()
  }
  deleteRoutes(): void {
    // add all get routes here
    // this.router.delete()
  }
}
export default new DataRouter().router;
