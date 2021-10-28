import { inject, injectable } from "tsyringe";
import {hash} from "bcrypt";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) { }

  async execute({ name, email, password, drive_license }: ICreateUserDTO): Promise<void> {

    const passwordHash = await hash(password,8);

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if(userAlreadyExists){
      throw new Error("User Already Exixts");
    }

    await this.userRepository.create({ name, email, password:passwordHash, drive_license });

  }

}

export { CreateUserUseCase }