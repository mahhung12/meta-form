import { unset } from 'lodash';
import type { z } from 'zod';

export class DTO {
  constructor() {}

  safeParseResponse<T>(schema: z.ZodObject<any>, response: any): T {
    const parsedResult = schema.safeParse(response);

    if (!parsedResult.success) {
      parsedResult.error.issues.map(({ path }) => {
        unset(response, path.join('.'));
      });
    }

    return parsedResult.success ? parsedResult.data : response;
  }
}
