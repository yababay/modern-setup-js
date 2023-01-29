import { NextFunction, Request, Response } from "express";
import styles from "./styles";

describe("Styles middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
        end: jest.fn(),
        status: jest.fn(),
        contentType: jest.fn(),
    };
  });

  test("Checking styles.css response", async () => {
    mockRequest = {originalUrl: '/test.css'};
    const expectedResponse = "h1{color:red}"
    styles(mockRequest as Request, mockResponse as Response, nextFunction)
    expect(mockResponse.end).toBeCalledWith(expectedResponse)

    expect(nextFunction).toBeCalledTimes(0);
  })
})
