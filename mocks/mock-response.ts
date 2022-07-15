import { createMock } from '@golevelup/ts-jest';
import { Response } from 'express';

export const mockResponseObject = () => {
  return createMock<Response>({
    json: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
  });
};
