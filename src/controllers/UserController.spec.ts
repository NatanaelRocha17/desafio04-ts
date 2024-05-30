import { UserController } from "./UserController";
import { UserService } from "../services/UserService";
import { Request } from "express";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe("UserController", () => {
  const mockUserService: Partial<UserService> = {
    createUser: jest.fn(),
    getAllUsers: jest.fn(),
    deleteUser: jest.fn()
  };

  const userController = new UserController(mockUserService as UserService);


  



  it("Deve adicionar um novo usuário", () => {
    const mockRequest = {
      body: {
        name: "natanael",
        email: "natanael@test.com",
      },
    } as Request;
    const mockResponse = makeMockResponse();
    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(201);
    expect(mockResponse.state.json).toMatchObject({
      message: "Usuário criado",
    });
  });

  it("Verifica se o nome passado não é nulo", () => {
    const mockRequest = {
      body: {
        name: "",
        email: "natanael@test.com",
      },
    } as Request;
    const mockResponse = makeMockResponse();
    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toMatchObject({
      message: "Bad request! Name obrigatório",
    });
  });

  it("O usuário nâo pode ser criado caso não informe o email", () => {
    const mockRequest = {
      body: {
        name: "natanael",
        email: "",
      },
    } as Request;
    const mockResponse = makeMockResponse();
    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toMatchObject({
      message: "Bad request! E-mail obrigatório",
    });
  });

  it("Verificar se a função getAllusers está sendo chamada", () => {
    const mockRequest = {} as Request;
    const mockResponse = makeMockResponse();
    userController.getAllUsers(mockRequest, mockResponse);
    expect(mockUserService.getAllUsers).toHaveBeenCalled();
  });

  it("Verificar se o usuário foi deletado", () => {
    const mockRequest = {
        body: {
          email: "natanael@dio.com",
        },
      } as Request;
    const mockResponse = makeMockResponse();
    userController.deleteUser(mockRequest, mockResponse);
    expect(mockUserService.deleteUser).toHaveBeenCalled();
  });
});
