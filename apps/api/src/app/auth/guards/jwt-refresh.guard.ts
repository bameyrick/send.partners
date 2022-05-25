import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { REFRESH_STRATEGY_KEY } from '../constants';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard(REFRESH_STRATEGY_KEY) {}
