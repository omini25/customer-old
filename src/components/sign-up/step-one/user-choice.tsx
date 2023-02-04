import { ChangeEventHandler, FC, MouseEventHandler } from 'react';
import { UserChoiceType } from '.';
import Indicator from './indicator';

interface Props {
  userChoice: UserChoiceType;
  name: string;
  value: UserChoiceType;
  onClick: MouseEventHandler;
  onChange: ChangeEventHandler;
}

const UserChoice: FC<Props> = ({ onClick, onChange, userChoice, value, name }) => {
  return (
    <label
      onClick={onClick}
      htmlFor={value}
      className="relative flex h-[3.625rem] w-[16rem] cursor-pointer select-none flex-row items-center rounded-[0.438rem] bg-white pl-[53px] font-semibold sm:w-[20.875rem]"
    >
      {userChoice === value && <Indicator />}
      <span>{name}</span>
      <input
        name="user_choice"
        type="radio"
        id={value}
        className="appearance-none"
        onChange={onChange}
      />
    </label>
  );
};

export default UserChoice;
