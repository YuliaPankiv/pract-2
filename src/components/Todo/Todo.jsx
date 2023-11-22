import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton } from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

export const Todo = ({ todo: { text, id }, index, onDelete, onEdit }) => {
  return (
    <TodoWrapper>
      <Text textAlign="center" marginBottom="20px">
        TODO {index}
      </Text>
      <Text>{text}</Text>
      <DeleteButton onClick={() => onDelete(id)} type="button">
        <RiDeleteBinLine size={24} />
      </DeleteButton>
      <EditButton type="button" onClick={() => onEdit(id)}>
        <RiEdit2Line size={24} />
      </EditButton>
    </TodoWrapper>
  );
};
