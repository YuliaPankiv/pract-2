import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';

import { SearchFormStyled, FormBtn, InputSearch } from 'components';
import { BtnEdit } from './EditForm.styled';

export const EditForm = ({ onCancel, onUpdate, onChange, currentTodo, as }) => {
  return (
    <SearchFormStyled
      onSubmit={e => {
        e.preventDefault();
        console.log('form');
        console.log(e.target);
        console.log(currentTodo);
        const up = currentTodo;
        as(up);
      }}
    >
      <BtnEdit type="button" onClick={onCancel}>
        <MdOutlineCancel size="16px" color="red" />
      </BtnEdit>

      <FormBtn type="submit">
        <RiSaveLine size="16px" color="green" />
      </FormBtn>

      <InputSearch
        placeholder="EDIT TODO"
        name="edit"
        required
        defaultValue={currentTodo.text}
        onChange={onChange}
        autoFocus
      />
    </SearchFormStyled>
  );
};
