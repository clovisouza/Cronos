/* eslint-disable prettier/prettier */
import { createParamDecorator } from '@nestjs/common';
import { TB_User } from 'src/Domain/Entidades/TB_User';


export const GetUser = createParamDecorator(
  (data, req): TB_User => {
    const user = req.args[0].user;
    return user;
  },
);