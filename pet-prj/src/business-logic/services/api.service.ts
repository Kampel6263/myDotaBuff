import { GeneralService } from './general.service';
import { HttpService } from './http';

class ApiService {
  /**
   * Init
   */
  public constructor(private http: HttpService) {}

  /**
   * Services
   */
  public general = new GeneralService(this.http);
}

export { ApiService };