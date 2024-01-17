
export function UserCard(p1) {
  const { name, id } = p1;

  return (
    <div>
      <div>NAME : {name}</div>
      <div>ID : {id}</div>
    </div>
  );
}

export default UserCard;
