import { Global, Module } from '@nestjs/common';
import { pool } from '@repo/db';

@Global()
@Module({
  providers: [
    {
      provide: 'PG_POOL',
      useFactory: async () => {
        //NOTE: test the connection
        await pool.query('SELECT 1');
        return pool;
      },
    },
  ],
  exports: ['PG_POOL'],
})
export class DatabaseModule {}
