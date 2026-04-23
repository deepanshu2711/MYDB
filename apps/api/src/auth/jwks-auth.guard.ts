import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { createRemoteJWKSet, jwtVerify } from 'jose';

export class JwksAuthGuard implements CanActivate {
  private JWKS = createRemoteJWKSet(
    new URL('https://auth-api.deepxdev.com/.well-known/jwks.json'),
  );

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token');
    }

    const token = authHeader.substring(7);

    try {
      const { payload } = await jwtVerify(token, this.JWKS, {
        issuer: 'https://auth.deepxdev.com',
      });

      request.user = {
        userId: payload.userId,
        appId: payload.appId,
        globalUserId: payload.globalUserId,
      };

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
