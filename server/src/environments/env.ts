import { ProdEnvironment } from './prod.env';
import { DevEnvironment } from './dev.env';

export interface Environment {
  db_url: string;
  jwt_secret: string;
}

export function getEnvironmentVariables(): Environment {
  if (process.env.NODE_ENV === 'production') {
    return ProdEnvironment;
  } else {
    return DevEnvironment;
  }
}
