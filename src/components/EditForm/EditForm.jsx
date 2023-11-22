import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';

import { SearchFormStyled, FormBtn, InputSearch } from 'components';
import { BtnEdit } from './EditForm.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EditForm = ({ onCancel, onUpdate, onChange, currentTodo }) => {
  return (
    <SearchFormStyled
      onSubmit={e => {
        e.preventDefault();
        onUpdate(currentTodo);
        {
          toast.success(`Todos has updated`);
        }
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
      <ToastContainer autoClose={1000} />
    </SearchFormStyled>
  );
};
